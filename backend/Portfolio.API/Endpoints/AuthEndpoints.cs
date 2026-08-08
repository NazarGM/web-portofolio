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
}
