using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using MonumentsMap.Contracts.Mail.Commands;
using MonumentsMap.MailService.Models;
using System.Threading.Tasks;

namespace MonumentsMap.MailService.Services
{
    class MailService
    {
        private readonly MailSettings _mailSettings;
        private readonly ILogger _logger;

        public MailService(IOptions<MailSettings> mailSettings, ILogger logger) 
            => (_mailSettings, _logger) = (mailSettings.Value, logger);

        public async Task SendEmailAsync(SendMailCommand mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();

            builder.HtmlBody = mailRequest.Body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();

            _logger.LogInformation($"SMTP LOCAL DOMAIN {smtp.LocalDomain}");

            try
            {
                smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.Auto);
            } 
            catch (SslHandshakeException ex)
            {
                _logger.LogInformation("ISSURE " + ex.ServerCertificate.Issuer);
                _logger.LogInformation("Subject " + ex.ServerCertificate.Subject);
                _logger.LogInformation("Handle " + ex.ServerCertificate.Handle);
                smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.None);
            }
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}