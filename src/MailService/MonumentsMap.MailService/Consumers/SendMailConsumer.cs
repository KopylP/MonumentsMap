using MassTransit;
using MonumentsMap.Contracts.Mail;
using System.Threading.Tasks;

namespace MonumentsMap.MailService.Consumers
{
    class SendMailConsumer : IConsumer<SendMailCommand>
    {
        private readonly Services.MailService _mailService;

        public SendMailConsumer(Services.MailService mailService) => _mailService = mailService;

        public async Task Consume(ConsumeContext<SendMailCommand> context)
        {
            if (context.Message != null)
            {
                await _mailService.SendEmailAsync(context.Message);
            }
        }
    }
}
