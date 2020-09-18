using System.Threading.Tasks;
using MonumentsMap.Entities.Mail;

namespace MonumentsMap.Contracts.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}