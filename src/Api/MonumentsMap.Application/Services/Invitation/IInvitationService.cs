using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Dto.User;
using System.Threading.Tasks;


namespace MonumentsMap.Application.Services.Invitation
{
    public interface IInvitationService
    {
        Task<InvitationResponseDto> InviteAsync(InvitationRequestDto dto);
        Task<UserResponseDto> RegisterAsync(RegisterUserRequestDto dto);
    }
}