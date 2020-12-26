using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MonumentsMap.Entities.Models
{
    public class City : BusinessEntity
    {
        #region  props
        [Required]
        public int NameId { get; set; }
        #endregion
        #region lazy props
        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }
        public virtual IEnumerable<Monument> Monuments { get; set; }
        #endregion

        #region lazy props
        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
        #endregion
    }
}