using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Contracts.Invitations;
using MonumentsMap.Contracts.User;

namespace MonumentsMap.Data.Services
{
    public class InvitationService : IInvitationService
    {
        private IRequestClient<InviteUserCommand> _inviteUserRequest;
        private IRequestClient<RegisterUserCommand> _registerUserRequest;
        private IMapper _mapper;

        public InvitationService(
            IMapper mapper, 
            IRequestClient<InviteUserCommand> inviteUserRequest,
            IRequestClient<RegisterUserCommand> registerUserRequest)
        {
            _mapper = mapper;
            _inviteUserRequest = inviteUserRequest;
            _registerUserRequest = registerUserRequest;
        }

        public async Task<InvitationResponseDto> InviteAsync(InvitationRequestDto model)
        {
            var request = _mapper.Map<InviteUserCommand>(model);
            var response = await _inviteUserRequest.GetResponse<InviteUserResult>(request);
            return _mapper.Map<InvitationResponseDto>(response.Message);
        }

        public async Task<UserResponseDto> RegisterAsync(RegisterUserRequestDto model)
        {
            var request = _mapper.Map<RegisterUserCommand>(model);
            var response = await _registerUserRequest.GetResponse<UserResult>(request);
            return _mapper.Map<UserResponseDto>(response.Message);
        }
    }
}