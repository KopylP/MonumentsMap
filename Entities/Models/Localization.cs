using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Entities.Models
{
    public class Localization : Entity
    {
        #region props
        [Required]
        public int LocalizationSetId { get; set; }
        [Required]
        public string CultureCode { get; set; }
        [Required]
        public string Value { get; set; }
        #endregion
        #region  lazy props
        [ForeignKey("LocalizationSetId")]
        public virtual LocalizationSet LocalizationSet { get; set; }
        [ForeignKey("CultureCode")]
        public virtual Culture Culture { get; set; }
        #endregion
    }
}