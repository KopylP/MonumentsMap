using MonumentsMap.Application.Dto.Invitation;
using System.Threading.Tasks;


namespace MonumentsMap.Application.Services.Invitation
{
    public interface IInvitationService
    {
        Task<InvitationResponseDto> CreateInviteAsync(string email);
        Task InvitePersonAsync(InvitationResponseDto invitation);
        Task<InvitationResult> CheckInvitationCodeAsync(string email, string invitationCode);
    }
}