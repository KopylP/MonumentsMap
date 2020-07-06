using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class Monument : Entity
    {
        #region props
        public int Year { get; set; }
        public Period Period { get; set; }
        public int NameId { get; set; }
        public int DescriptionId { get; set; }
        public int CityId { get; set; }
        public int StatusId { get; set; }
        public int ConditionId { get; set; }
        public bool Accepted { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CreatorId { get; set; }
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
        [ForeignKey("CreatorId")]
        public virtual Creator Creator { get; set; }
        #endregion
    }
}