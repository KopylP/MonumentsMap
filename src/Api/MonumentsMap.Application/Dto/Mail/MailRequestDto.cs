using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace MonumentsMap.Application.Dto.Mail
{
    public class MailRequestDto
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}