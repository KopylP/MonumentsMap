using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Entities.Models
{
    public class Photo : Entity
    {
        [Required]
        public string FileName { get; set; }
        [Required]
        public double ImageScale { get; set; }
    }
}