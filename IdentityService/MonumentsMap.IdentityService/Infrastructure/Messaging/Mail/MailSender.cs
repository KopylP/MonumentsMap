using MassTransit;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Contracts;
using MonumentsMap.Contracts.Mail.Commands;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Infrastructure.Messaging.Mail
{
    public class MailSender
    {
        private readonly ISendEndpointProvider _sendEndpointProvider;
        private readonly string _rabbitMqUrl;

        public MailSender(ISendEndpointProvider sendEndpointProvider, IConfiguration configuration)
        {
            _sendEndpointProvider = sendEndpointProvider;
            _rabbitMqUrl = configuration["RabbitHost"];
        }

        public async Task SendMailAsync(SendMailCommand sendMailCommand)
        {
            var endpoint = await _sendEndpointProvider.GetSendEndpoint(new System.Uri(_rabbitMqUrl + "/" + RebbitMqMassTransitConstants.SendMailQueue));
            await endpoint.Send(sendMailCommand);
        }
    }
}