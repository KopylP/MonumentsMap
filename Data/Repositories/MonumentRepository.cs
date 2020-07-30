using MonumentsMap.Models;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentRepository : Repository<Monument, ApplicationContext>
    {
        #region  constructor
        public MonumentRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}