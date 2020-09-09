using System.Threading.Tasks;
using MonumentsMap.Models;

namespace MonumentsMap.Services.Interfaces
{
    public interface IMailService
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}