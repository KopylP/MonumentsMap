using System;

namespace MonumentsMap.Domain.Models
{
    public class Invitation : Entity
    {
        public string Email { get; set; }
        public string Salt { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}