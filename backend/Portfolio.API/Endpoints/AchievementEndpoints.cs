using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class AchievementEndpoints
    {
        public static void MapAchievementEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/achievements", async (AppDbContext db) =>
            {
                return await db.Achievements.ToListAsync();
            });

            group.MapPost("/achievements", async (Achievement achievement, AppDbContext db) =>
            {
                db.Achievements.Add(achievement);
                await db.SaveChangesAsync();
                return Results.Created($"/api/achievements/{achievement.Id}", achievement);
            }).RequireAuthorization();

            group.MapPut("/achievements/{id}", async (Guid id, Achievement updatedAchievement, AppDbContext db) =>
            {
                var achievement = await db.Achievements.FindAsync(id);
                if (achievement == null) return Results.NotFound();

                achievement.Title = updatedAchievement.Title;
                achievement.TitleEn = updatedAchievement.TitleEn;
                achievement.Issuer = updatedAchievement.Issuer;
                achievement.Date = updatedAchievement.Date;
                achievement.ThumbnailUrl = updatedAchievement.ThumbnailUrl;
                achievement.Description = updatedAchievement.Description;
                achievement.DescriptionEn = updatedAchievement.DescriptionEn;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();

            group.MapDelete("/achievements/{id}", async (Guid id, AppDbContext db) =>
            {
                var achievement = await db.Achievements.FindAsync(id);
                if (achievement == null) return Results.NotFound();

                db.Achievements.Remove(achievement);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
