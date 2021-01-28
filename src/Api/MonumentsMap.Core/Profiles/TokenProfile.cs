using AutoMapper;
using MonumentsMap.Application.Dto.Auth;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Contracts.Auth;
using MonumentsMap.Contracts.User;

namespace MonumentsMap.Core.Profiles
{
    class TokenProfile : Profile
    {
        public TokenProfile()
        {
            CreateMap<TokenRequestDto, GetTokenCommand>().ReverseMap();
            CreateMap<GetTokenResult, TokenResponseDto>();
            CreateMap<RegisterUserRequestDto, RegisterUserCommand>();
        }
    }
}
