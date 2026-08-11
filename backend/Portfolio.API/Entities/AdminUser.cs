using System;

namespace Portfolio.API.Entities
{
    public class AdminUser
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Username { get; set; }
        public string? Email { get; set; }
        public required string PasswordHash { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
    }
}
