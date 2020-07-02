using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Models
{
    public class Culture
    {
        [Key]
        public string Code { get; set; }
        public string Name { get; set; }
    }
}