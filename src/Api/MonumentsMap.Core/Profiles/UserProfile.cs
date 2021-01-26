using AutoMapper;
using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Contracts.Invitations;
using MonumentsMap.Contracts.User;

namespace MonumentsMap.Core.Profiles
{
    class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<InvitationRequestDto, InviteUserCommand>();
            CreateMap<UserResult, UserResponseDto>();
            CreateMap<RoleResult, RoleResponseDto>();
        }
    }
}
