using System;
using System.Collections.Generic;
using MonumentsMap.Entities.Enumerations;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Entities.ViewModels.LocalizedModels
{
    public class LocalizedMonument : LocalizedEntity
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public Period Period { get; set; }
        public int? DestroyYear { get; set; }
        public Period? DestroyPeriod { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public int StatusId { get; set; }
        public int ConditionId { get; set; }
        public bool Accepted { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int? MajorPhotoImageId { get; set; }
        public string ProtectionNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<SourceViewModel> Sources { get; set; }
        public LocalizedCity City { get; set; }
        public LocalizedCondition Condition { get; set; }
        public LocalizedStatus Status { get; set; }
        public List<MonumentPhotoViewModel> MonumentPhotos { get; set; }

    }
}