using Microsoft.EntityFrameworkCore;
using Portfolio.API.Entities;

namespace Portfolio.API.Data
{
    public static class SeedData
    {
        public static void Seed(WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.Migrate();

            // Admin user
            if (!db.AdminUsers.Any())
            {
                var adminPassword = app.Configuration["ADMIN_PASSWORD"];
                if (string.IsNullOrWhiteSpace(adminPassword))
                {
                    var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
                    var bytes = new byte[16];
                    rng.GetBytes(bytes);
                    adminPassword = Convert.ToBase64String(bytes);
                    Console.WriteLine($"[SeedData] ADMIN_PASSWORD not set. Generated admin password: {adminPassword}");
                    Console.WriteLine($"[SeedData] Change this password immediately via the admin panel.");
                }

                db.AdminUsers.Add(new AdminUser
                {
                    Username = "admin",
                    PasswordHash = Endpoints.AuthEndpoints.HashPassword(adminPassword)
                });
            }

            // Profile (single row)
            if (!db.Profiles.Any())
            {
                db.Profiles.Add(new Profile
                {
                    Name = "Nazar",
                    Title = "Game Developer",
                    Bio = "Passionate game developer focusing on interactive 3D experiences, creative coding, and indie games. I build things that are fun to play with.",
                    Age = 25,
                    Location = "Indonesia",
                    Email = "email@example.com",
                    Website = "https://example.com"
                });
            }

            // Social links
            if (!db.SocialLinks.Any())
            {
                db.SocialLinks.AddRange(
                    new SocialLink { Platform = "GitHub", Url = "https://github.com/nazar", IconName = "github" },
                    new SocialLink { Platform = "LinkedIn", Url = "https://linkedin.com/in/nazar", IconName = "linkedin" },
                    new SocialLink { Platform = "X", Url = "https://x.com/nazar", IconName = "x" }
                );
            }

            // Sample experiences
            if (!db.Experiences.Any())
            {
                db.Experiences.AddRange(
                    new Experience { Role = "Senior Game Developer", Company = "Indie Studio", Type = "Full-time", StartDate = DateTime.UtcNow.AddYears(-3), Description = "Leading development of a cozy indie title shipped to Steam." },
                    new Experience { Role = "Game Developer", Company = "Freelance", Type = "Freelance", StartDate = DateTime.UtcNow.AddYears(-5), EndDate = DateTime.UtcNow.AddYears(-3), Description = "Built 2D and 3D games for various indie clients." }
                );
            }

            // Sample projects
            if (!db.Projects.Any())
            {
                db.Projects.AddRange(
                    new Project { Title = "Cozy Garden Sim", Description = "A relaxing gardening game with 3D low-poly art.", Tags = "[\"Unity\",\"C#\",\"3D\"]", DemoUrl = "https://example.com", GithubUrl = "https://github.com/nazar" },
                    new Project { Title = "Pixel Runner", Description = "A fast-paced endless runner with procedural levels.", Tags = "[\"Godot\",\"GDScript\"]", DemoUrl = "https://example.com" }
                );
            }

            // Sample skills
            if (!db.Skills.Any())
            {
                db.Skills.AddRange(
                    new Skill { Name = "Unity", Category = "Engine", Level = 90 },
                    new Skill { Name = "C#", Category = "Language", Level = 85 },
                    new Skill { Name = "Three.js", Category = "Engine", Level = 75 },
                    new Skill { Name = "Blender", Category = "Tool", Level = 70 }
                );
            }

            // Sample achievements
            if (!db.Achievements.Any())
            {
                db.Achievements.AddRange(
                    new Achievement { Title = "Indie Game of the Year", Issuer = "Game Awards", Date = DateTime.UtcNow.AddYears(-1), Description = "Won best indie title at a regional game awards." }
                );
            }

            db.SaveChanges();
        }
    }
}