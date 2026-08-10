using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Portfolio.API.Data;
using Portfolio.API.Entities;
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

                if (!string.IsNullOrWhiteSpace(req.NewPassword))
                    user.PasswordHash = HashPassword(req.NewPassword);

                await db.SaveChangesAsync();
                return Results.Ok(new { message = "Account updated successfully" });
            }).RequireAuthorization();

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
    public record UpdateAccountRequest(string? CurrentPassword, string? NewUsername, string? NewPassword);
    public record ResetRequest(string ResetKey, string NewPassword, string? NewUsername);
}
