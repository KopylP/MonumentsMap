using System.Collections.Generic;
using System.Linq;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Domain.Enumerations;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto
{
    public class EditableLocalizedMonumentDto : BaseEditableLocalizedDto<Monument>
    {
        public int Year { get; set; }
        public Period Period { get; set; }
        public int? DestroyYear { get; set; }
        public Period? DestroyPeriod { get; set; }
        public List<CultureValuePair> Name { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public int CityId { get; set; }
        public int StatusId { get; set; }
        public int ConditionId { get; set; }
        public bool Accepted { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string ProtectionNumber { get; set; }
        public List<Source> Sources { get; set; }
        public override Monument CreateEntity(Monument entity = null)
        {
            Monument monument = null;
            if (entity != null)
            {
                monument = entity;
                monument.Description?.Localizations?.Clear();
                monument.Name?.Localizations?.Clear();
                monument.Sources?.Clear();
            }
            else
            {
                monument = new Monument
                {
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Sources = new List<Source>(),
                };
            }

            monument.Year = Year;
            monument.Period = Period;
            monument.CityId = CityId;
            monument.StatusId = StatusId;
            monument.ConditionId = ConditionId;
            monument.Accepted = Accepted;
            monument.Latitude = Latitude;
            monument.Longitude = Longitude;
            monument.ProtectionNumber = ProtectionNumber;
            monument.DestroyYear = DestroyYear;
            monument.DestroyPeriod = DestroyPeriod;
            monument.Sources.AddRange(Sources);
            foreach (var cultureValuePair in Name)
            {
                monument.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValuePair.Culture,
                    Value = cultureValuePair.Value.Trim()
                });
            }
            foreach (var cultureValuePair in Description)
            {
                monument.Description.Localizations.Add(new Localization
                {
                    CultureCode = cultureValuePair.Culture,
                    Value = cultureValuePair.Value.Trim()
                });
            }
            return monument;
        }

        public static EditableLocalizedMonumentDto FromEntity(Monument entity)
        {
            return new EditableLocalizedMonumentDto
            {
                Id = entity.Id,
                Period = entity.Period,
                CityId = entity.CityId,
                StatusId = entity.StatusId,
                ConditionId = entity.ConditionId,
                Accepted = entity.Accepted,
                Latitude = entity.Latitude,
                DestroyPeriod = entity.DestroyPeriod,
                DestroyYear = entity.DestroyYear,
                Year = entity.Year,
                Longitude = entity.Longitude,
                ProtectionNumber = entity.ProtectionNumber,
                Sources = entity.Sources.Select(p =>
                {
                    p.Monument = null;
                    return p;
                }).ToList(),
                Name = entity.Name.GetCultureValuePairs(),
                Description = entity.Description.GetCultureValuePairs()
            };
        }
    }
}