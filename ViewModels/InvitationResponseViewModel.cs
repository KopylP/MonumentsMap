using System;

namespace MonumentsMap.ViewModels
{
    public class InvitationResponseViewModel
    {
        public string InvitationCode { get; set; }
        public string Email { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}