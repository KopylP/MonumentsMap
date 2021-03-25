using Microsoft.Extensions.DependencyInjection;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Repositories;

namespace MonumentsMap.Infrastructure.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<IConditionRepository, ConditionRepository>();
            services.AddScoped<IMonumentPhotoRepository, MonumentPhotoRepository>();
            services.AddScoped<IMonumentRepository, MonumentRepository>();
            services.AddScoped<IParticipantMonumentRepository, ParticipantMonumentRepository>();
            services.AddScoped<IParticipantRepository, ParticipantRepository>();
            services.AddScoped<IStatusRepository, StatusRepository>();
            services.AddScoped<ITagRepository, TagRepository>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<UnitOfWork.UnitOfWork>();
        }
    }
}