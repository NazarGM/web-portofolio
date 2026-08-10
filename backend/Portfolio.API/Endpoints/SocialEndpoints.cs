using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class SocialEndpoints
    {
        public static void MapSocialEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/socials", async (AppDbContext db) =>
            {
                return await db.SocialLinks.ToListAsync();
            });

            group.MapPost("/socials", async (SocialLink social, AppDbContext db) =>
            {
                db.SocialLinks.Add(social);
                await db.SaveChangesAsync();
                return Results.Created($"/api/socials/{social.Id}", social);
            }).RequireAuthorization();

            group.MapPut("/socials/{id}", async (Guid id, SocialLink updated, AppDbContext db) =>
            {
                var social = await db.SocialLinks.FindAsync(id);
                if (social == null) return Results.NotFound();

                social.Platform = updated.Platform;
                social.Url = updated.Url;
                social.IconName = updated.IconName;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();

            group.MapDelete("/socials/{id}", async (Guid id, AppDbContext db) =>
            {
                var social = await db.SocialLinks.FindAsync(id);
                if (social == null) return Results.NotFound();

                db.SocialLinks.Remove(social);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
