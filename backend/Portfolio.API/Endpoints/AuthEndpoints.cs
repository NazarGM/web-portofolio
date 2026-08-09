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
            group.MapPost("/auth/login", async (LoginRequest req, AppDbContext db, IConfiguration cfg) =>
            {
                if (string.IsNullOrWhiteSpace(req.Username) || string.IsNullOrWhiteSpace(req.Password))
                    return Results.BadRequest(new { message = "Username and password required" });

                var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.Username == req.Username);
                if (user == null || !VerifyPassword(req.Password, user.PasswordHash))
                    return Results.Unauthorized();

                var token = GenerateToken(user, cfg);
                return Results.Ok(new { token });
            });

            group.MapPut("/auth/account", async (UpdateAccountRequest req, AppDbContext db, ClaimsPrincipal userClaim) =>
            {
                var username = userClaim.FindFirst(ClaimTypes.Name)?.Value;
                var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.Username == username);
                if (user == null) return Results.NotFound();

                if (!string.IsNullOrWhiteSpace(req.CurrentPassword) && !VerifyPassword(req.CurrentPassword, user.PasswordHash))
                    return Results.BadRequest(new { message = "Current password is incorrect" });

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

        public static string HashPassword(string password)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private static bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }

        private static string GenerateToken(AdminUser user, IConfiguration cfg)
        {
            var secret = cfg["Jwt:Secret"] ?? "SuperSecretKeyForLocalDevelopmentOnlyPleaseChangeMe123!";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
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
