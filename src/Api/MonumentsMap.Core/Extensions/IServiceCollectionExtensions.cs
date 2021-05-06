using System;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Application.Services.Filter;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Application.Services.Photo;
using MonumentsMap.Application.Services.Roles;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Core.Services.Filter;
using MonumentsMap.Core.Services.Monuments;
using MonumentsMap.Core.Services.Photo;
using MonumentsMap.Core.Services.Roles;
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
            services.AddScoped<ITagService, TagService>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IInvitationService, InvitationService>();
            services.AddScoped<IRolesService, RolesService>();

            services.AddScoped<IImageService, ImageService>();
            services.AddScoped<IPhotoService, PhotoService>();

            services.AddScoped<IFilterService, FilterService>();
        }

        public static void AddMapping(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(IServiceCollectionExtensions));
        }
    }
}