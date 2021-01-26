using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.IdentityService.Models
{
    public class Token : Entity
    {
        [Required]
        public string ClientId { get; set; }

        public int Type { get; set; }

        [Required]
        public string Value { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}