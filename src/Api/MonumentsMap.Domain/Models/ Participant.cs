using MonumentsMap.Framework.Enums.Monuments;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Domain.Models
{
    public class Participant : BusinessEntity
    {
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string DefaultName { get; set; }

        public int? NameId { get; set; }

        public ParticipantRole? ParticipantRole { get; set; }

        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }

        public virtual List<ParticipantMonument> ParticipantMonuments { get; set; }
    }
}