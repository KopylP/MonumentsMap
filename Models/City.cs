using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class City
    {
        #region  props
        public int Id { get; set; }
        public int NameId { get; set; }
        #endregion
        #region lazy props
        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }
        public virtual IEnumerable<Monument> Monuments { get; set; }
        #endregion
    }
}