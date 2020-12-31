using System.Collections.Generic;

namespace MonumentsMap.Domain.Models
{
    public class LocalizationSet : Entity
    {
        #region props
        #endregion
        #region  lazy props
        public virtual ICollection<Localization> Localizations { get; set; }
        #endregion
    }
}