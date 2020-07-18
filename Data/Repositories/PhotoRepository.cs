using MonumentsMap.Models;

namespace MonumentsMap.Data.Repositories
{
    public class PhotoRepository : Repository<Photo, ApplicationContext>
    {
        #region constructor
        public PhotoRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}