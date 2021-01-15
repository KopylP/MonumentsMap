using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Infrastructure.Persistence;
using MonumentsMap.Infrastructure.Repositories;

namespace MonumentsMap.Data.Repositories
{
    public class TokenRepository : Repository<Token>, ITokenRepository
    {
        public TokenRepository(ApplicationContext context) : base(context)
        {
        }
    }
}