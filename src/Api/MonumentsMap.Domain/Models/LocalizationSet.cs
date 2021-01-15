using System.Collections.Generic;

namespace MonumentsMap.Domain.Models
{
    public class LocalizationSet : Entity
    {
        public virtual ICollection<Localization> Localizations { get; set; }
    }
}