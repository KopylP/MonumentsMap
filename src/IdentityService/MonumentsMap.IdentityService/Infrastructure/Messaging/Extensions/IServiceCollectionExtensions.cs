using GreenPipes;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.IdentityService.Consumers.Auth;
using MonumentsMap.IdentityService.Consumers.Registration;
using MonumentsMap.IdentityService.Consumers.Roles;
using MonumentsMap.IdentityService.Consumers.User;
using MonumentsMap.IdentityService.Infrastructure.Messaging.Mail;

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

                x.AddConsumer<AuthUserConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                
                x.AddConsumer<RegisterUserConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<InviteUserConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                
                x.AddConsumer<ChangeUserRolesConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<DeleteUserByIdConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<GetUserByIdConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<GetUserRolesConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<GetUsersConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<RemoveUserFromRolesConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
                });
                x.AddConsumer<GetAllRolesConsumer>(e =>
                {
                    e.UseMessageRetry(r =>
                    {
                        r.Immediate(5);
                        r.Ignore<ApiException>();
                    });
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