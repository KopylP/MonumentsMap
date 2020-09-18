using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace MonumentsMap.Entities.Models
{
    public class ApplicationUser : IdentityUser
    {
        #region props
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
        #endregion
    }
}