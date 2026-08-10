using System;

namespace Portfolio.API.Entities
{
    public class Profile
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public required string Title { get; set; }
        public string? TitleEn { get; set; }
        public string? Bio { get; set; }
        public string? BioEn { get; set; }
        public int? Age { get; set; }
        public string? Location { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? AvatarUrl { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
