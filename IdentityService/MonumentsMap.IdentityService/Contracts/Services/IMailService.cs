using MonumentsMap.Contracts.Mail.Commands;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Contracts.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(SendMailCommand mailRequest);
    }
}
