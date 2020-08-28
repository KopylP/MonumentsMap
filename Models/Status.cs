using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class Status : Entity
    {
        #region props
        [Required]
        public int NameId { get; set; }
        public int? DescriptionId { get; set; }
        [Required]
        public string Abbreviation { get; set; }
        #endregion
        #region  lazy props
        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }
        [ForeignKey("DescriptionId")]
        public virtual LocalizationSet Description { get; set; }
        public virtual IEnumerable<Monument> Monuments { get; set; }
        #endregion
    }
}