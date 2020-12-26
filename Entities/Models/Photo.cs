using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Entities.Models
{
    public class Photo : BusinessEntity
    {
        [Required]
        public string FileName { get; set; }
        [Required]
        public double ImageScale { get; set; }
    }
}