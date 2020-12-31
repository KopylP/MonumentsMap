using System.Threading.Tasks;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Application.Services.Auth
{
    public interface ITokenService
    {
        Task<TokenResponseDto> RefreshTokenAsync(TokenRequestDto model);
        Task<TokenResponseDto> GetTokenAsync(TokenRequestDto model);
    }
}