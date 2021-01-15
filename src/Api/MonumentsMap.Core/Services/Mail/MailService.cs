using System;
using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Mail;
using MonumentsMap.Application.Services.Mail;
using MonumentsMap.Infrastructure.Messaging.Mail;

namespace MonumentsMap.Data.Services
{
    public class MailService : IMailService
    {
        private readonly MailSender _mailSender;

        public MailService(MailSender mailSender) => _mailSender = mailSender;

        public async Task SendEmailAsync(MailRequestDto mailRequest)
        {
            await _mailSender.SendMailAsync(new Contracts.Mail.Commands.SendMailCommand
            {
                CommandId = Guid.NewGuid(),
                Timestamp = DateTime.Now,
                ToEmail = mailRequest.ToEmail,
                Body = mailRequest.Body,
                Subject = mailRequest.Subject
            });
        }
    }
}