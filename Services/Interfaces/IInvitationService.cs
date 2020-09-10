using System.Threading.Tasks;
using MonumentsMap.Services.enums;
using MonumentsMap.ViewModels;

namespace MonumentsMap.Services.Interfaces
{
    public interface IInvitationService
    {
        Task<InvitationResponseViewModel> CreateInviteAsync(string email);
        Task InvitePersonAsync(InvitationResponseViewModel invitation);
        Task<InvitationResult> CheckInvitationCodeAsync(string email, string invitationCode);
    }
}