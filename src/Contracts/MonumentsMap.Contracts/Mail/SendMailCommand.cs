using System;

namespace MonumentsMap.Contracts.Mail
{
    public class SendMailCommand : BaseCommand
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}