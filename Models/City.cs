using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using MonumentsMap.ViewModels.LocalizedModels;

namespace MonumentsMap.Models
{
    public class City : Entity
    {
        #region  props
        public int NameId { get; set; }
        #endregion
        #region lazy props
        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }
        public virtual IEnumerable<Monument> Monuments { get; set; }
        #endregion
    }
}