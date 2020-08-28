using System;
using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Models
{
    public class Token : Entity
    {
        #region props
        [Required]
        public string ClientId {get; set; }
        public int Type { get; set; }
        [Required]
        public string Value { get; set; }
        [Required]
        public string UserId { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        [Required]
        public DateTime ModifiedAt { get; set; }
        #endregion
    }
}