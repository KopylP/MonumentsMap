using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.Contracts;
using MonumentsMap.IdentityService.Consumers.Auth;
using MonumentsMap.IdentityService.Consumers.Registration;
using MonumentsMap.IdentityService.Consumers.User;

namespace MonumentsMap.IdentityService.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddMessagingBus(this IServiceCollection services, string host)
        {
            services.AddMassTransit(x =>
            {
                x.AddConsumer<AuthUserConsumer>();

                x.AddConsumer<InviteUserConsumer>();
                x.AddConsumer<RegisterUserConsumer>();

                x.AddConsumer<ChangeUserRolesConsumer>();
                x.AddConsumer<DeleteUserByIdConsumer>();
                x.AddConsumer<GetUserByIdConsumer>();
                x.AddConsumer<GetUserRolesConsumer>();
                x.AddConsumer<GetUsersConsumer>();
                x.AddConsumer<RemoveUserFromRolesConsumer>();

                x.SetKebabCaseEndpointNameFormatter();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(host);
                });
            });

            services.AddMassTransitHostedService();
        }
    }
}
