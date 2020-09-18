using System.Threading.Tasks;
using MonumentsMap.Entities.Enumerations;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Contracts.Services
{
    public interface IInvitationService
    {
        Task<InvitationResponseViewModel> CreateInviteAsync(string email);
        Task InvitePersonAsync(InvitationResponseViewModel invitation);
        Task<InvitationResult> CheckInvitationCodeAsync(string email, string invitationCode);
    }
}