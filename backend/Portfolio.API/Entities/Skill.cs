using System;

namespace Portfolio.API.Entities
{
    public class Skill
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; }
        public string? Description { get; set; }
        public string? IconName { get; set; }
        public int Level { get; set; } = 0; // 0-100
        public string? Category { get; set; }
        public int SortOrder { get; set; } = 0;
    }
}
