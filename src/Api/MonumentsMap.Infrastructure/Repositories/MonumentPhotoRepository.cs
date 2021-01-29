using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class MonumentPhotoRepository : FilterRepository<MonumentPhoto, MonumentPhotoFilterParameters>, IMonumentPhotoRepository
    {
        public MonumentPhotoRepository(ApplicationContext context) : base(context)
        {
        }
    }
}