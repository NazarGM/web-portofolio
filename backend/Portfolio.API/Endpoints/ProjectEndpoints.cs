using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class ProjectEndpoints
    {
        public static void MapProjectEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/projects", async (AppDbContext db) =>
            {
                return await db.Projects.ToListAsync();
            });

            group.MapPost("/projects", async (Project project, AppDbContext db) =>
            {
                db.Projects.Add(project);
                await db.SaveChangesAsync();
                return Results.Created($"/api/projects/{project.Id}", project);
            }).RequireAuthorization();

            group.MapPut("/projects/{id}", async (Guid id, Project updatedProject, AppDbContext db) =>
            {
                var project = await db.Projects.FindAsync(id);
                if (project == null) return Results.NotFound();

                project.Title = updatedProject.Title;
                project.TitleEn = updatedProject.TitleEn;
                project.Description = updatedProject.Description;
                project.DescriptionEn = updatedProject.DescriptionEn;
                project.ThumbnailUrl = updatedProject.ThumbnailUrl;
                project.Tags = updatedProject.Tags;
                project.DemoUrl = updatedProject.DemoUrl;
                project.GithubUrl = updatedProject.GithubUrl;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();

            group.MapDelete("/projects/{id}", async (Guid id, AppDbContext db) =>
            {
                var project = await db.Projects.FindAsync(id);
                if (project == null) return Results.NotFound();

                db.Projects.Remove(project);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
