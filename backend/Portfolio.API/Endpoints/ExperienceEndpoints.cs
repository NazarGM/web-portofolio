using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class ExperienceEndpoints
    {
        public static void MapExperienceEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/experiences", async (AppDbContext db) =>
            {
                return await db.Experiences.ToListAsync();
            });

            group.MapPost("/experiences", async (Experience experience, AppDbContext db) =>
            {
                db.Experiences.Add(experience);
                await db.SaveChangesAsync();
                return Results.Created($"/api/experiences/{experience.Id}", experience);
            }).RequireAuthorization();

            group.MapPut("/experiences/{id}", async (Guid id, Experience updatedExperience, AppDbContext db) =>
            {
                var experience = await db.Experiences.FindAsync(id);
                if (experience == null) return Results.NotFound();

                experience.Role = updatedExperience.Role;
                experience.RoleEn = updatedExperience.RoleEn;
                experience.Company = updatedExperience.Company;
                experience.Type = updatedExperience.Type;
                experience.StartDate = updatedExperience.StartDate;
                experience.EndDate = updatedExperience.EndDate;
                experience.Description = updatedExperience.Description;
                experience.DescriptionEn = updatedExperience.DescriptionEn;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();

            group.MapDelete("/experiences/{id}", async (Guid id, AppDbContext db) =>
            {
                var experience = await db.Experiences.FindAsync(id);
                if (experience == null) return Results.NotFound();

                db.Experiences.Remove(experience);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
