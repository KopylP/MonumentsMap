using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Entities.Mail;
using MonumentsMap.Entities.Settings;

namespace MonumentsMap.Data.Services
{
    public class MailService : IMailService
    {
        #region private fields
        private readonly MailSettings _mailSettings;
        #endregion
        #region constructor
        public MailService(IOptions<MailSettings> mailSettings) => _mailSettings = mailSettings.Value;
        #endregion
        #region interface methods
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            using var client = new SmtpClient(_mailSettings.Host);
            client.Port = 587;
            client.EnableSsl = false;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(_mailSettings.Mail, _mailSettings.Password);
            var from = new MailAddress(_mailSettings.Mail);
            var to = new MailAddress(mailRequest.ToEmail);

            var message = new MailMessage(from, to);
            message.Body = mailRequest.Body;
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.Subject = mailRequest.Subject;
            await Task.Run(() => client.Send(message));
        }
        #endregion
    }
}