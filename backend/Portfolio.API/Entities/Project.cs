using System;
using System.Collections.Generic;

namespace Portfolio.API.Entities
{
    public class Project
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public string Tags { get; set; } = "[]"; // Serialized JSON array of strings
        public string? DemoUrl { get; set; }
        public string? GithubUrl { get; set; }
        public int SortOrder { get; set; } = 0;
    }
}
