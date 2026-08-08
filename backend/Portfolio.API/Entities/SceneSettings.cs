using System;

namespace Portfolio.API.Entities
{
    public class SceneSettings
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? CharacterModelUrl { get; set; }
        public string? PlatformModelUrl { get; set; }
        public string PlatformColor { get; set; } = "#FFE4EC";
        public string AmbientColor { get; set; } = "#FFF0F3";
        public string ParticleColor { get; set; } = "#FFB3C6";
        public string CameraPosition { get; set; } = "[0, 1.5, 5.5]";
    }
}
