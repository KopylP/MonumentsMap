using MonumentsMap.Entities.Enumerations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Entities.Models
{
    public class Monument : BusinessEntity
    {
        #region props
        [Required]
        public int Year { get; set; }
        [Required]
        public Period Period { get; set; }
        public int? DestroyYear { get; set; }
        public Period? DestroyPeriod { get; set; }
        [Required]
        public int NameId { get; set; }
        [Required]
        public int DescriptionId { get; set; }
        [Required]
        public int CityId { get; set; }
        [Required]
        public int StatusId { get; set; }
        [Required]
        public int ConditionId { get; set; }
        [Required]
        public bool Accepted { get; set; }
        [Required]
        public double Latitude { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        public string Slug { get; set; }
        public string ProtectionNumber { get; set; }
        #endregion
        #region lazy props
        [ForeignKey("CityId")]
        public virtual City City { get; set; }
        [ForeignKey("StatusId")]
        public virtual Status Status { get; set; }
        [ForeignKey("ConditionId")]
        public virtual Condition Condition { get; set; }
        [ForeignKey("NameId")]
        public virtual LocalizationSet Name { get; set; }
        [ForeignKey("DescriptionId")]
        public virtual LocalizationSet Description { get; set; }
        public virtual List<Source> Sources { get; set; }
        public virtual List<MonumentPhoto> MonumentPhotos { get; set; }
        public virtual List<ParticipantMonument> ParticipantMonuments { get; set; }
        #endregion
    }
}