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
using MonumentsMap.Core.Profiles;
using MonumentsMap.Core.Profiles.Converters;
using MonumentsMap.Core.Resolvers;
using MonumentsMap.Core.Services.Filter;
using MonumentsMap.Core.Services.Monuments;
using MonumentsMap.Core.Services.Photo;
using MonumentsMap.Core.Services.Roles;
using MonumentsMap.Data.Services;
using MonumentsMap.Domain.Resolvers;

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
            services.AddSingleton<IPhotoUrlResolver, PhotoUrlResolver>();
        }

        public static void AddMapping(this IServiceCollection services)
        {
            services.AddSingleton<PhotoConverter>();
            services.AddSingleton<MonumentPhotoConverter>();

            services.AddSingleton(provider => new MapperConfiguration(cnf =>
            {
                cnf.AddProfile(new CommonProfile());
                cnf.AddProfile(new FiltersProfile());
                cnf.AddProfile(new TokenProfile());
                cnf.AddProfile(new PhotoProfile(provider.GetService<PhotoConverter>()));
                cnf.AddProfile(new UserProfile());
                cnf.AddProfile(new MonumentProfile(provider.GetService<MonumentPhotoConverter>()));
            }).CreateMapper());
        }
    }
}