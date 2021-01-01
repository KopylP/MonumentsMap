using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MonumentsMap.Domain.Models
{
    public class City : BusinessEntity
    {
        [Required]
        public int NameId { get; set; }

        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }

        public virtual IEnumerable<Monument> Monuments { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
    }
}