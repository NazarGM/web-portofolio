using System;

namespace Portfolio.API.Entities
{
    public class Experience
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Role { get; set; }
        public required string Company { get; set; }
        public string? Type { get; set; } // e.g., Full-time, Freelance
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; } // null implies 'Present'
        public string? Description { get; set; }
        public int SortOrder { get; set; } = 0;
    }
}
