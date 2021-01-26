using System.Threading.Tasks;
using MonumentsMap.Contracts.Mail.Commands;
using MonumentsMap.IdentityService.Contracts.Services;
using MonumentsMap.IdentityService.Infrastructure.Messaging.Mail;

namespace MonumentsMap.IdentityService.Services.Mail
{
    public class MailService : IMailService
    {
        private readonly MailSender _mailSender;

        public MailService(MailSender mailSender) => _mailSender = mailSender;

        public async Task SendEmailAsync(SendMailCommand mailRequest)
        {
            await _mailSender.SendMailAsync(mailRequest);
        }
    }
}