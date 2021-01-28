using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.Contracts.Auth;
using MonumentsMap.Contracts.Invitations;
using MonumentsMap.Contracts.Roles;
using MonumentsMap.Contracts.User;

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
                    cfg.ConfigureEndpoints(context);
                });

                x.AddRequestClient<GetTokenCommand>();
                x.AddRequestClient<InviteUserCommand>();

                x.AddRequestClient<ChangeUserRolesCommand>();
                x.AddRequestClient<DeleteUserByIdCommand>();
                x.AddRequestClient<GetUserByIdCommand>();
                x.AddRequestClient<GetUserRolesCommand>();
                x.AddRequestClient<GetUsersCommand>();
                x.AddRequestClient<RegisterUserCommand>();
                x.AddRequestClient<RemoveUserFromRolesCommand>();

                x.AddRequestClient<GetAllRolesCommand>();
            });

            services.AddMassTransitHostedService();
        }

        public static void AddMessagingServices(this IServiceCollection services)
        {
        }
    }
}