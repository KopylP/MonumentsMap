using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentPhotoRepository : Repository<MonumentPhoto, ApplicationContext>, IMonumentPhotoRepository
    {
        public MonumentPhotoRepository(ApplicationContext context) : base(context)
        {
        }
    }
}