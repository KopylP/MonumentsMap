using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class Condition
    {
        #region props
        public int Id { get; set; }
        public int NameId { get; set; }
        public int? DescriptionId { get; set; }
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