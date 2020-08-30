using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class ParticipantMonument : Entity
    {
        #region  props
        [Required]
        public int ParticipantId { get; set; }
        [Required]
        public int MonumentId { get; set; }
        #endregion
        #region lazy props
        [ForeignKey("ParticipantId")]
        public virtual Participant Participant { get; set; }
        [ForeignKey("MonumentId")]
        public virtual Monument Monument { get; set; }
        #endregion
    }
}