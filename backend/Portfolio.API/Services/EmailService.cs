using System.Net;
using System.Net.Mail;

namespace Portfolio.API.Services
{
    public static class EmailService
    {
        public static async Task SendAsync(IConfiguration config, string toEmail, string resetLink)
        {
            var host = config["Smtp:Host"];
            var portStr = config["Smtp:Port"];
            var username = config["Smtp:Username"];
            var password = config["Smtp:Password"];
            var fromEmail = config["Smtp:FromEmail"] ?? username ?? "noreply@portfolio.local";
            var fromName = config["Smtp:FromName"] ?? "Portfolio Admin";

            if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                // If SMTP is not configured, log to console for development
                Console.WriteLine($"[EmailService] SMTP not configured. Password reset link for {toEmail}: {resetLink}");
                return;
            }

            var port = int.TryParse(portStr, out var p) ? p : 587;

            #pragma warning disable CS0618
            using var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(fromEmail, fromName),
                Subject = "Password Reset Request",
                Body = $"Hello,\n\nYou requested a password reset for your portfolio admin account.\nClick the link below to reset your password:\n\n{resetLink}\n\nIf you did not request this, please ignore this email.",
                IsBodyHtml = false
            };
            mailMessage.To.Add(toEmail);

            await client.SendMailAsync(mailMessage);
            #pragma warning restore CS0618
        }
    }
}
