using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class PhotoRepository : Repository<Photo, ApplicationContext>, IPhotoRepository
    {
        #region constructor
        public PhotoRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}