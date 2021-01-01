using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Application.Services.Mail;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Core.Services.Monuments;
using MonumentsMap.Data.Services;

namespace MonumentsMap.Core.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IMonumentPhotoService, MonumentPhotoService>();
            services.AddScoped<IMonumentService, MonumentService>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<IConditionService, ConditionService>();
            services.AddScoped<IParticipantService, ParticipantService>();
            services.AddScoped<IStatusService, StatusService>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IInvitationService, InvitationService>();
            services.AddScoped<IPhotoService, PhotoService>();
        }
    }
}