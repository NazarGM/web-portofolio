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
                db.AdminUsers.Add(new AdminUser
                {
                    Username = "admin",
                    PasswordHash = Endpoints.AuthEndpoints.HashPassword("admin123")
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

            // Scene settings (single row)
            if (!db.SceneSettings.Any())
            {
                db.SceneSettings.Add(new SceneSettings
                {
                    PlatformColor = "#FFE4EC",
                    AmbientColor = "#FFF0F3",
                    ParticleColor = "#FFB3C6",
                    CameraPosition = "[0, 1.5, 5.5]"
                });
            }

            // Social links
            if (!db.SocialLinks.Any())
            {
                db.SocialLinks.AddRange(
                    new SocialLink { Platform = "GitHub", Url = "https://github.com/nazar", IconName = "github", SortOrder = 0 },
                    new SocialLink { Platform = "LinkedIn", Url = "https://linkedin.com/in/nazar", IconName = "linkedin", SortOrder = 1 },
                    new SocialLink { Platform = "X", Url = "https://x.com/nazar", IconName = "x", SortOrder = 2 }
                );
            }

            // Sample experiences
            if (!db.Experiences.Any())
            {
                db.Experiences.AddRange(
                    new Experience { Role = "Senior Game Developer", Company = "Indie Studio", Type = "Full-time", StartDate = DateTime.UtcNow.AddYears(-3), Description = "Leading development of a cozy indie title shipped to Steam.", SortOrder = 0 },
                    new Experience { Role = "Game Developer", Company = "Freelance", Type = "Freelance", StartDate = DateTime.UtcNow.AddYears(-5), EndDate = DateTime.UtcNow.AddYears(-3), Description = "Built 2D and 3D games for various indie clients.", SortOrder = 1 }
                );
            }

            // Sample projects
            if (!db.Projects.Any())
            {
                db.Projects.AddRange(
                    new Project { Title = "Cozy Garden Sim", Description = "A relaxing gardening game with 3D low-poly art.", Tags = "[\"Unity\",\"C#\",\"3D\"]", DemoUrl = "https://example.com", GithubUrl = "https://github.com/nazar", SortOrder = 0 },
                    new Project { Title = "Pixel Runner", Description = "A fast-paced endless runner with procedural levels.", Tags = "[\"Godot\",\"GDScript\"]", DemoUrl = "https://example.com", SortOrder = 1 }
                );
            }

            // Sample skills
            if (!db.Skills.Any())
            {
                db.Skills.AddRange(
                    new Skill { Name = "Unity", Category = "Engine", Level = 90, SortOrder = 0 },
                    new Skill { Name = "C#", Category = "Language", Level = 85, SortOrder = 1 },
                    new Skill { Name = "Three.js", Category = "Engine", Level = 75, SortOrder = 2 },
                    new Skill { Name = "Blender", Category = "Tool", Level = 70, SortOrder = 3 }
                );
            }

            // Sample achievements
            if (!db.Achievements.Any())
            {
                db.Achievements.AddRange(
                    new Achievement { Title = "Indie Game of the Year", Issuer = "Game Awards", Date = DateTime.UtcNow.AddYears(-1), Description = "Won best indie title at a regional game awards.", SortOrder = 0 }
                );
            }

            db.SaveChanges();
        }
    }
}