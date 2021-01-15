using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Mail;

namespace MonumentsMap.Application.Services.Mail
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequestDto mailRequest);
    }
}