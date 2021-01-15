using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class MonumentPhotoRepository : Repository<MonumentPhoto>, IMonumentPhotoRepository
    {
        public MonumentPhotoRepository(ApplicationContext context) : base(context)
        {
        }
    }
}