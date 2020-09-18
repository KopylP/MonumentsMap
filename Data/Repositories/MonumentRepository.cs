using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentRepository : Repository<Monument, ApplicationContext>, IMonumentRepository
    {
        #region  constructor
        public MonumentRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}