using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Domain.Models
{
    public class Localization : Entity
    {
        [Required]
        public int LocalizationSetId { get; set; }

        [Required]
        public string CultureCode { get; set; }

        [Required]
        public string Value { get; set; }

        [ForeignKey("LocalizationSetId")]
        public virtual LocalizationSet LocalizationSet { get; set; }

        [ForeignKey("CultureCode")]
        public virtual Culture Culture { get; set; }
    }
}