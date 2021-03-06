using System;

namespace MonumentsMap.IdentityService.Models
{
    public class Invitation : Entity
    {
        public string Email { get; set; }

        public string Salt { get; set; }

        public DateTime ExpireAt { get; set; }
    }
}