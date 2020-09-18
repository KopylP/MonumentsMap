using MonumentsMap.Entities.Models;

namespace MonumentsMap.Data.Repositories
{
    public class TokenRepository : Repository<Token, ApplicationContext>, ITokenRepository
    {
        #region constructor
        public TokenRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}