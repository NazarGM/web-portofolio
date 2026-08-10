using System;

namespace Portfolio.API.Entities
{
    public class SocialLink
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Platform { get; set; }
        public required string Url { get; set; }
        public string? IconName { get; set; }
    }
}
