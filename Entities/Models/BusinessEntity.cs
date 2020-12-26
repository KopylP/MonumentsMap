using System;
using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Entities.Models
{
    public class BusinessEntity : Entity
    {
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}