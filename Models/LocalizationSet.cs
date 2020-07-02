using System.Collections.Generic;

namespace MonumentsMap.Models
{
    public class LocalizationSet
    {
        #region props
        public int Id { get; set; }
        #endregion
        #region  lazy props
        public virtual ICollection<Localization> Localizations { get; set; }
        #endregion
    }
}