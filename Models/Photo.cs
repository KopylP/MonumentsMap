using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Models
{
    public class Photo : Entity
    {
        [Required]
        public string FileName { get; set; }
    }
}