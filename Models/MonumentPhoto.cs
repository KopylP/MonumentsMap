using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class MonumentPhoto : Entity
    {
        #region props
        public int? Year { get; set; }
        public Period? Period { get; set; }
        [Required]
        public int MonumentId { get; set; }
        [Required]
        public int? DescriptionId { get; set; }
        [Required]
        public int PhotoId { get; set; }
        [Required]
        public bool MajorPhoto { get; set; }
        #endregion
        #region  lazy props
        [ForeignKey("DescriptionId")]
        public virtual LocalizationSet Description { get; set; }
        [ForeignKey("PhotoId")]
        public virtual Photo Photo { get; set; }
        public virtual List<Source> Sources { get; set; }
        #endregion
    }
}