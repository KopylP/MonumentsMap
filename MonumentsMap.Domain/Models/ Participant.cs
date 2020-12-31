using MonumentsMap.Domain.Enumerations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Domain.Models
{
    public class Participant : BusinessEntity
    {
        #region  props
        [Required]
        public string DefaultName { get; set; }
        public int? NameId { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }
        #endregion
        #region  lazy props
        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }
        public virtual List<ParticipantMonument> ParticipantMonuments { get; set; }
        #endregion
    }
}