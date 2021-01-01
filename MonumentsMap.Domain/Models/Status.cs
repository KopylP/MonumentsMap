using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Domain.Models
{
    public class Status : BusinessEntity
    {
        [Required]
        public int NameId { get; set; }

        public int? DescriptionId { get; set; }

        [Required]
        public string Abbreviation { get; set; }

        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }

        [ForeignKey("DescriptionId")]
        public virtual LocalizationSet Description { get; set; }

        public virtual IEnumerable<Monument> Monuments { get; set; }
    }
}