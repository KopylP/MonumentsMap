using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Domain.Models
{
    public class Photo : BusinessEntity
    {
        [Required]
        public string FileName { get; set; }
        [Required]
        public double ImageScale { get; set; }
    }
}