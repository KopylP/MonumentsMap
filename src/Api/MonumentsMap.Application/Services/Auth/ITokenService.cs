using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Auth;

namespace MonumentsMap.Application.Services.Auth
{
    public interface ITokenService
    {
        Task<TokenResponseDto> GetTokenAsync(TokenRequestDto model);
    }
}