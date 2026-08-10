using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class SkillEndpoints
    {
        public static void MapSkillEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/skills", async (AppDbContext db) =>
            {
                return await db.Skills.ToListAsync();
            });

            group.MapPost("/skills", async (Skill skill, AppDbContext db) =>
            {
                db.Skills.Add(skill);
                await db.SaveChangesAsync();
                return Results.Created($"/api/skills/{skill.Id}", skill);
            }).RequireAuthorization();

            group.MapPut("/skills/{id}", async (Guid id, Skill updatedSkill, AppDbContext db) =>
            {
                var skill = await db.Skills.FindAsync(id);
                if (skill == null) return Results.NotFound();

                skill.Name = updatedSkill.Name;
                skill.NameEn = updatedSkill.NameEn;
                skill.Description = updatedSkill.Description;
                skill.DescriptionEn = updatedSkill.DescriptionEn;
                skill.IconName = updatedSkill.IconName;
                skill.Level = updatedSkill.Level;
                skill.Category = updatedSkill.Category;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();

            group.MapDelete("/skills/{id}", async (Guid id, AppDbContext db) =>
            {
                var skill = await db.Skills.FindAsync(id);
                if (skill == null) return Results.NotFound();

                db.Skills.Remove(skill);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
