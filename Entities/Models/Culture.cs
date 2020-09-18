using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Entities.Models
{
    public class Culture
    {
        [Key]
        [Required]
        public string Code { get; set; }
        [Required]
        public string Name { get; set; }
    }
}