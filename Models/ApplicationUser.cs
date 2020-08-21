using System;
using Microsoft.AspNetCore.Identity;

namespace MonumentsMap.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}