using System;

namespace Portfolio.API.Entities
{
    public class Achievement
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Title { get; set; }
        public string? Issuer { get; set; }
        public DateTime? Date { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string? Description { get; set; }
        public int SortOrder { get; set; } = 0;
    }
}
