using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Portfolio.API.Data;
using Portfolio.API.Entities;
using Portfolio.API.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Portfolio.API.Endpoints
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(this RouteGroupBuilder group, IConfiguration config)
        {
            var jwtSecret = config["Jwt:Secret"]
                ?? throw new InvalidOperationException("Jwt:Secret is not configured.");

            group.MapPost("/auth/login", async (LoginRequest req, AppDbContext db) =>
            {
                if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
                    return Results.BadRequest(new { message = "Username and password required" });

                var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.Username == req.Username);
                if (user == null) return Results.Unauthorized();

                var ok = VerifyPassword(req.Password, user.PasswordHash);
                if (!ok && IsLegacyHash(user.PasswordHash) && VerifyLegacy(req.Password, user.PasswordHash))
                {
                    user.PasswordHash = HashPassword(req.Password);
                    await db.SaveChangesAsync();
                    ok = true;
                }

                if (!ok) return Results.Unauthorized();

                var token = GenerateToken(user, jwtSecret, config);
                return Results.Ok(new { token });
            }).RequireRateLimiting("loginLimit");

            group.MapPut("/auth/account", async (UpdateAccountRequest req, AppDbContext db, ClaimsPrincipal userClaim) =>
            {
                var username = userClaim.FindFirst(ClaimTypes.Name)?.Value;
                var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.Username == username);
                if (user == null) return Results.NotFound();

                if (!string.IsNullOrWhiteSpace(req.CurrentPassword))
                {
                    var ok = VerifyPassword(req.CurrentPassword, user.PasswordHash);
                    if (!ok && IsLegacyHash(user.PasswordHash) && VerifyLegacy(req.CurrentPassword, user.PasswordHash))
                    {
                        user.PasswordHash = HashPassword(req.CurrentPassword);
                        ok = true;
                    }
                    if (!ok) return Results.BadRequest(new { message = "Current password is incorrect" });
                }

                if (!string.IsNullOrWhiteSpace(req.NewUsername))
                    user.Username = req.NewUsername;

                if (req.Email != null)
                    user.Email = req.Email;

        if (!string.IsNullOrWhiteSpace(req.NewPassword))
                {
                    var passwordError = ValidateNewPassword(req.NewPassword);
                    if (passwordError != null) return Results.BadRequest(new { message = passwordError });
                    user.PasswordHash = HashPassword(req.NewPassword);
                }

                if (!string.IsNullOrWhiteSpace(req.Email))
                    user.Email = req.Email;

                await db.SaveChangesAsync();
                return Results.Ok(new { message = "Account updated successfully" });
            }).RequireAuthorization();

            group.MapPost("/auth/forgot-password", async (ForgotPasswordRequest req, AppDbContext db, IConfiguration cfg) =>
            {
                if (string.IsNullOrWhiteSpace(req.Email))
                    return Results.BadRequest(new { message = "Email is required" });

                var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.Email == req.Email.Trim());
                if (user == null)
                {
                    // Constant-time response to avoid email enumeration timing oracle
                    await Task.Delay(300);
                    return Results.Ok(new { message = "If the email is registered, a password reset link has been sent." });
                }

                var rawToken = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
                user.ResetToken = HashToken(rawToken);
                user.ResetTokenExpires = DateTime.UtcNow.AddHours(1);
                await db.SaveChangesAsync();

                var frontendUrl = cfg["App:FrontendUrl"] ?? "http://localhost:3000";
                var link = $"{frontendUrl}/admin/reset-password?token={rawToken}";
                await EmailService.SendAsync(cfg, user.Email!, link);

                return Results.Ok(new { message = "If the email is registered, a password reset link has been sent." });
            }).RequireRateLimiting("forgotLimit");

            group.MapPost("/auth/reset-password", async (ResetPasswordRequest req, AppDbContext db) =>
            {
                if (string.IsNullOrWhiteSpace(req.Token) || string.IsNullOrWhiteSpace(req.NewPassword))
                    return Results.BadRequest(new { message = "Token and new password are required" });

                var passwordError = ValidateNewPassword(req.NewPassword);
                if (passwordError != null)
                    return Results.BadRequest(new { message = passwordError });

                var tokenHash = HashToken(req.Token);
                var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.ResetToken == tokenHash && u.ResetTokenExpires > DateTime.UtcNow);
                if (user == null) return Results.BadRequest(new { message = "Invalid or expired reset token" });

                user.PasswordHash = HashPassword(req.NewPassword);
                user.ResetToken = null;
                user.ResetTokenExpires = null;
                await db.SaveChangesAsync();

                return Results.Ok(new { message = "Password has been reset successfully" });
            }).RequireRateLimiting("resetLimit");

            group.MapPost("/auth/reset", async (ResetRequest req, AppDbContext db, IConfiguration cfg) =>
            {
                var expectedKey = cfg["AdminResetKey"];
                if (string.IsNullOrEmpty(expectedKey) || expectedKey != req.ResetKey)
                    return Results.Unauthorized();

                var user = await db.AdminUsers.FirstOrDefaultAsync();
                if (user == null)
                {
                    db.AdminUsers.Add(new AdminUser
                    {
                        Username = req.NewUsername ?? "admin",
                        PasswordHash = HashPassword(req.NewPassword)
                    });
                }
                else
                {
                    user.Username = req.NewUsername ?? user.Username;
                    user.PasswordHash = HashPassword(req.NewPassword);
                }
                await db.SaveChangesAsync();
                return Results.Ok(new { message = "Admin credentials reset successfully" });
            });
        }

        private static string HashToken(string token)
        {
            return Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
        }

        private static string? ValidateNewPassword(string password)
        {
            if (password.Length < 8)
                return "Password must be at least 8 characters long";
            return null;
        }

        private const int Pbkdf2Iterations = 100_000;

        public static string HashPassword(string password)
        {
            var salt = RandomNumberGenerator.GetBytes(16);
            var key = Rfc2898DeriveBytes.Pbkdf2(password, salt, Pbkdf2Iterations, HashAlgorithmName.SHA256, 32);
            return $"pbkdf2_sha256${Pbkdf2Iterations}${Convert.ToBase64String(salt)}${Convert.ToBase64String(key)}";
        }

        private static bool IsLegacyHash(string hash)
        {
            return !string.IsNullOrEmpty(hash) && !hash.StartsWith("pbkdf2_sha256$");
        }

        private static bool VerifyPassword(string password, string hash)
        {
            if (string.IsNullOrEmpty(hash)) return false;

            var parts = hash.Split('$');
            if (parts.Length != 4 || parts[0] != "pbkdf2_sha256") return false;
            if (!int.TryParse(parts[1], out var iterations) || iterations < 10_000) return false;

            var salt = Convert.FromBase64String(parts[2]);
            var expected = Convert.FromBase64String(parts[3]);
            var actual = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, HashAlgorithmName.SHA256, expected.Length);
            return CryptographicOperations.FixedTimeEquals(expected, actual);
        }

        private static bool VerifyLegacy(string password, string hash)
        {
            using var sha = SHA256.Create();
            var computed = Convert.ToBase64String(sha.ComputeHash(Encoding.UTF8.GetBytes(password)));
            return CryptographicOperations.FixedTimeEquals(
                Encoding.UTF8.GetBytes(computed),
                Encoding.UTF8.GetBytes(hash));
        }

        private static string GenerateToken(AdminUser user, string jwtSecret, IConfiguration cfg)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: cfg["Jwt:Issuer"] ?? "PortfolioAPI",
                audience: cfg["Jwt:Audience"] ?? "PortfolioAdmin",
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public record LoginRequest(string Username, string Password);
    public record UpdateAccountRequest(string? CurrentPassword, string? NewUsername, string? NewPassword, string? Email);
    public record ForgotPasswordRequest(string Email);
    public record ResetPasswordRequest(string Token, string NewPassword);
    public record ResetRequest(string ResetKey, string NewPassword, string? NewUsername);
}
