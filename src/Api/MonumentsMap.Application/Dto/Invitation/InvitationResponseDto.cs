using System;

namespace MonumentsMap.Application.Dto.Invitation
{
    public class InvitationResponseDto
    {
        public string InvitationCode { get; set; }
        public string Email { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}