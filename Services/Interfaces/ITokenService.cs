using System.Threading.Tasks;
using MonumentsMap.ViewModels;

namespace MonumentsMap.Services.Interfaces
{
    public interface ITokenService
    {
        Task<TokenResponseViewModel> RefreshTokenAsync(TokenRequestViewModel model);
        Task<TokenResponseViewModel> GetTokenAsync(TokenRequestViewModel model);
    }
}