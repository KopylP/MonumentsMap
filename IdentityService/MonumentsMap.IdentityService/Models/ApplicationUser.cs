using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace MonumentsMap.IdentityService.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}