namespace Portfolio.API.Endpoints
{
    public static class UploadEndpoints
    {
        private static readonly string[] AllowedExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".glb" };
        private const long MaxSizeBytes = 50 * 1024 * 1024;

        public static void MapUploadEndpoints(this RouteGroupBuilder group)
        {
            group.MapPost("/uploads", async (IFormFile file, IWebHostEnvironment env) =>
            {
                if (file == null || file.Length == 0)
                    return Results.BadRequest(new { message = "No file uploaded" });

                if (file.Length > MaxSizeBytes)
                    return Results.BadRequest(new { message = "File exceeds 50MB limit" });

                var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!AllowedExtensions.Contains(ext))
                    return Results.BadRequest(new { message = $"File type {ext} not allowed" });

                var uploadsDir = Path.Combine(env.WebRootPath ?? "wwwroot", "uploads");
                Directory.CreateDirectory(uploadsDir);

                var filename = $"{Guid.NewGuid():N}{ext}";
                var fullPath = Path.Combine(uploadsDir, filename);

                await using var stream = File.Create(fullPath);
                await file.CopyToAsync(stream);

                return Results.Ok(new { url = $"/api/uploads/{filename}" });
            }).RequireAuthorization().DisableAntiforgery();
        }
    }
}
