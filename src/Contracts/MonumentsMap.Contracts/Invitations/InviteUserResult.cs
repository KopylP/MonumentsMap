using System;

namespace MonumentsMap.Contracts.Invitations
{
    public class InviteUserResult
    {
        public string InvitationCode { get; set; }
        public string Email { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}