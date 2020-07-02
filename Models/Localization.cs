using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class Localization
    {
        #region props
        public int Id {get; set;}
        public int LocalizationSetId { get; set; }
        public string CultureCode { get; set; }
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