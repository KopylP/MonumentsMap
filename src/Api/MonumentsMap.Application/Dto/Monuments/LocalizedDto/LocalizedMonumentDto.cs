using System;
using System.Collections.Generic;
using System.Linq;
using Mapster;
using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Domain.Models;
using MonumentsMap.Framework.Enums.Monuments;

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

        public static LocalizedMonumentDto ToDto(Monument monument, string cultureCode, params string[] excludes)
        {
            var localizedMonument = new LocalizedMonumentDto
            {
                Id = monument.Id,
                Year = monument.Year,
                Period = monument.Period,
                Name = monument.Name.GetNameByCode(cultureCode),
                Description = monument.Description.GetNameByCode(cultureCode),
                DestroyYear = monument.DestroyYear,
                DestroyPeriod = monument.DestroyPeriod,
                Slug = monument.Slug,
                CityId = monument.CityId,
                StatusId = monument.StatusId,
                ConditionId = monument.ConditionId,
                Accepted = monument.Accepted,
                Latitude = monument.Latitude,
                Longitude = monument.Longitude,
                CreatedAt = monument.CreatedAt,
                UpdatedAt = monument.UpdatedAt,
                ProtectionNumber = monument.ProtectionNumber,
                MajorPhotoImageId = monument.MonumentPhotos.Where(p => p.MajorPhoto).FirstOrDefault()?.PhotoId
            };

            if (monument.Condition != null && !excludes.Contains(nameof(monument.Condition)))
            {
                localizedMonument.Condition = new LocalizedConditionDto
                {
                    Id = monument.Condition.Id,
                    Abbreviation = monument.Condition.Abbreviation,
                    Name = monument.Condition.Name.GetNameByCode(cultureCode),
                    Description = monument.Condition.Description.GetNameByCode(cultureCode)
                };
            }

            if (monument.City != null && !excludes.Contains(nameof(monument.City)))
            {
                localizedMonument.City = new LocalizedCityDto
                {
                    Id = monument.City.Id,
                    Name = monument.City.Name.GetNameByCode(cultureCode)
                };
            }

            if (monument.Sources != null && !excludes.Contains(nameof(monument.Sources)))
            {
                localizedMonument.Sources = monument.Sources.Adapt<SourceDto[]>().ToList();
            }

            if (monument.MonumentPhotos != null && !excludes.Contains(nameof(monument.MonumentPhotos)))
            {
                localizedMonument.MonumentPhotos = monument.MonumentPhotos.Adapt<MonumentPhotoDto[]>().ToList();
            }

            if (monument.Status != null && !excludes.Contains(nameof(monument.Status)))
            {   
                localizedMonument.Status = new LocalizedStatusDto
                {
                    Id = monument.Status.Id,
                    Abbreviation = monument.Status.Abbreviation,
                    Name = monument.Status.Name.GetNameByCode(cultureCode),
                    Description = monument.Status.Description.GetNameByCode(cultureCode)
                };
            }

            return localizedMonument;
        }
    }
}