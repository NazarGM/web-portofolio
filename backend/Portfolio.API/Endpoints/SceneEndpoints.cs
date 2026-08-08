using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using Portfolio.API.Entities;

namespace Portfolio.API.Endpoints
{
    public static class SceneEndpoints
    {
        public static void MapSceneEndpoints(this RouteGroupBuilder group)
        {
            group.MapGet("/scene-settings", async (AppDbContext db) =>
            {
                var scene = await db.SceneSettings.FirstOrDefaultAsync();
                if (scene == null) return Results.NotFound();
                return Results.Ok(scene);
            });

            group.MapPut("/scene-settings", async (SceneSettings updated, AppDbContext db) =>
            {
                var scene = await db.SceneSettings.FirstOrDefaultAsync();
                if (scene == null)
                {
                    db.SceneSettings.Add(updated);
                    await db.SaveChangesAsync();
                    return Results.Ok(updated);
                }

                scene.CharacterModelUrl = updated.CharacterModelUrl;
                scene.PlatformModelUrl = updated.PlatformModelUrl;
                scene.PlatformColor = updated.PlatformColor;
                scene.AmbientColor = updated.AmbientColor;
                scene.ParticleColor = updated.ParticleColor;
                scene.CameraPosition = updated.CameraPosition;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }).RequireAuthorization();
        }
    }
}
