using MonumentsMap.IdentityService.Contracts.Repositories;
using MonumentsMap.IdentityService.Models;
using MonumentsMap.IdentityService.Persistence;

namespace MonumentsMap.IdentityService.Infrastructure.Repositories
{
    public class TokenRepository : Repository<Token>, ITokenRepository
    {
        public TokenRepository(ApplicationContext context) : base(context)
        {
        }
    }
}