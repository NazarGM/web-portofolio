using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class ProfileEndpoints
    {
        public static void MapProfileEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/profile", async (AppDbContext db) =>
            {
                var profile = await db.Profiles.FirstOrDefaultAsync();
                if (profile == null) return Results.NotFound();
                return Results.Ok(profile);
            });

            group.MapPut("/profile", async (Profile updatedProfile, AppDbContext db) =>
            {
                var profile = await db.Profiles.FirstOrDefaultAsync();
                if (profile == null)
                {
                    db.Profiles.Add(updatedProfile);
                }
                else
                {
                    profile.Name = updatedProfile.Name;
                    profile.Title = updatedProfile.Title;
                    profile.TitleEn = updatedProfile.TitleEn;
                    profile.Bio = updatedProfile.Bio;
                    profile.BioEn = updatedProfile.BioEn;
                    profile.Age = updatedProfile.Age;
                    profile.Location = updatedProfile.Location;
                    profile.Email = updatedProfile.Email;
                    profile.Website = updatedProfile.Website;
                    profile.AvatarUrl = updatedProfile.AvatarUrl;
                    profile.UpdatedAt = DateTime.UtcNow;
                }

                await db.SaveChangesAsync();
                return Results.Ok(profile ?? updatedProfile);
            }).RequireAuthorization();
        }
    }
}
