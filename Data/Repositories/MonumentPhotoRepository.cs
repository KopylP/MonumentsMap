using MonumentsMap.Models;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentPhotoRepository : Repository<MonumentPhoto, ApplicationContext>
    {
        public MonumentPhotoRepository(ApplicationContext context) : base(context)
        {
        }
    }
}