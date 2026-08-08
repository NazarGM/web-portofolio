using System;

namespace Portfolio.API.Entities
{
    public class AdminUser
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Username { get; set; }
        public required string PasswordHash { get; set; }
    }
}
