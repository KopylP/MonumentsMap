using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.IdentityService.Infrastructure.Messaging.Mail;

namespace MonumentsMap.Infrastructure.Messaging.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddMessagingBus(this IServiceCollection services, string host)
        {
            services.AddMassTransit(x =>
            {

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(host);
                });
            });

            services.AddMassTransitHostedService();
        }

        public static void AddMessagingServices(this IServiceCollection services)
        {
            services.AddScoped<MailSender>();
        }
    }
}