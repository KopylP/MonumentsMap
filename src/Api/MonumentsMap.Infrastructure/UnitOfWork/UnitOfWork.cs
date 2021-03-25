using Microsoft.EntityFrameworkCore.Storage;
using MonumentsMap.Infrastructure.Persistence;

namespace MonumentsMap.Infrastructure.UnitOfWork
{
    public class UnitOfWork
    { 
        private ApplicationContext _context;

        public UnitOfWork(ApplicationContext context)
        {
            _context = context;
        }

        public IDbContextTransaction BeginTransaction()
        {
            return _context.Database.BeginTransaction();
        }
    }
}
