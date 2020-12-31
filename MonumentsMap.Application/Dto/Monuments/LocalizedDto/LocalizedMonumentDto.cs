using System;
using System.Collections.Generic;
using MonumentsMap.Domain.Enumerations;

namespace MonumentsMap.Application.Dto.Monuments.LocalizedDto
{
    public class LocalizedMonumentDto : BaseLocalizedDto
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
        public string Slug { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<SourceDto> Sources { get; set; }
        public LocalizedCityDto City { get; set; }
        public LocalizedConditionDto Condition { get; set; }
        public LocalizedStatusDto Status { get; set; }
        public List<MonumentPhotoDto> MonumentPhotos { get; set; }

    }
}