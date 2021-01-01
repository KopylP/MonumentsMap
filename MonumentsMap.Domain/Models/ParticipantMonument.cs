using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Domain.Models
{
    public class ParticipantMonument : BusinessEntity
    {
        [Required]
        public int ParticipantId { get; set; }

        [Required]
        public int MonumentId { get; set; }

        [ForeignKey("ParticipantId")]
        public virtual Participant Participant { get; set; }

        [ForeignKey("MonumentId")]
        public virtual Monument Monument { get; set; }
    }
}