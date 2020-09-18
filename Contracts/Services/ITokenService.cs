using System.Threading.Tasks;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Contracts.Services
{
    public interface ITokenService
    {
        Task<TokenResponseViewModel> RefreshTokenAsync(TokenRequestViewModel model);
        Task<TokenResponseViewModel> GetTokenAsync(TokenRequestViewModel model);
    }
}