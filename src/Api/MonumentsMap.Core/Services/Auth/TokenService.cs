using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using MonumentsMap.Application.Dto.Auth;
using MonumentsMap.Application.Services.Auth;
using MonumentsMap.Contracts.Auth;

namespace MonumentsMap.Data.Services
{
    public class TokenService : ITokenService
    {

        private IRequestClient<GetTokenCommand> _requestClient;
        private IMapper _mapper;

        public TokenService(IRequestClient<GetTokenCommand> requestClient, IMapper mapper) => (_requestClient, _mapper) = (requestClient, mapper);

        public async Task<TokenResponseDto> GetTokenAsync(TokenRequestDto model)
        {
            var request = _mapper.Map<GetTokenCommand>(model);
            var response = await _requestClient.GetResponse<GetTokenResult>(request);
            return _mapper.Map<TokenResponseDto>(response.Message);
        }
    }
}