using MassTransit;
using Microsoft.Extensions.DependencyInjection;

namespace MonumentsMap.Infrastructure.Messaging.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddMessagingBus(this IServiceCollection services, string host)
        {
            services.AddMassTransit(x =>
            {
                x.SetKebabCaseEndpointNameFormatter();
                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(host);
                });
            });

            services.AddMassTransitHostedService();
        }

        public static void AddMessagingServices(this IServiceCollection services)
        {
        }
    }
}