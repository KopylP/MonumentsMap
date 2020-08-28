using MonumentsMap.Models;

namespace MonumentsMap.Data.Repositories
{
    public class TokenRepository : Repository<Token, ApplicationContext>
    {
        #region constructor
        public TokenRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}