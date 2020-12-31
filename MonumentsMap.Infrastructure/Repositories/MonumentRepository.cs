using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.Repositories
{
    public class MonumentRepository : Repository<Monument>, IMonumentRepository
    {
        #region  constructor
        public MonumentRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}