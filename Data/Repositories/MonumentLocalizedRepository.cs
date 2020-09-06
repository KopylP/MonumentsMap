using System;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Extensions;
using MonumentsMap.Models;
using MonumentsMap.ViewModels;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentLocalizedRepository : LocalizedRepository<LocalizedMonument, EditableLocalizedMonument, Monument, ApplicationContext>
    {
        private readonly StatusLocalizedRepository statusLocalizedRepository;
        private readonly CityLocalizedRepository cityLocalizedRepository;
        private readonly ConditionLocalizedRepository conditionLocalizedRepository;
        public MonumentLocalizedRepository(
            ApplicationContext context,
            CityLocalizedRepository cityLocalizedRepository,
            ConditionLocalizedRepository conditionLocalizedRepository,
            StatusLocalizedRepository statusLocalizedRepository
        ) : base(context)
        {
            this.statusLocalizedRepository = statusLocalizedRepository;
            this.conditionLocalizedRepository = conditionLocalizedRepository;
            this.cityLocalizedRepository = cityLocalizedRepository;
        }

        protected override EditableLocalizedMonument GetEditableLocalizedEntity(Monument entity) => new EditableLocalizedMonument
        {
            Id = entity.Id,
            Period = entity.Period,
            CityId = entity.CityId,
            StatusId = entity.StatusId,
            ConditionId = entity.ConditionId,
            Accepted = entity.Accepted,
            Latitude = entity.Latitude,
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


        protected override Func<Monument, LocalizedMonument> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var localizationDescription = p.Description?
                    .Localizations?
                    .FirstOrDefault(p => p.CultureCode == cultureCode)?
                    .Value;
                localizationDescription = localizationDescription != null && localizationDescription != string.Empty
                 ? localizationDescription : p.Description?
                    .Localizations?
                    .FirstOrDefault(p => p.CultureCode == "uk-UA")?.Value;

                var localizationName = p.Name?
                    .Localizations?
                    .FirstOrDefault(p => p.CultureCode == cultureCode)?
                    .Value;
                localizationName = localizationName != null && localizationName != string.Empty ? localizationName :
                    p.Name?.Localizations?.FirstOrDefault(p => p.CultureCode == "uk-UA")?.Value;


                var monument = new LocalizedMonument
                {
                    Id = p.Id,
                    Year = p.Year,
                    Period = p.Period,
                    Name = localizationName,
                    Description = localizationDescription,
                    CityId = p.CityId,
                    StatusId = p.StatusId,
                    ConditionId = p.ConditionId,
                    Accepted = p.Accepted,
                    Latitude = p.Latitude,
                    Longitude = p.Longitude,
                    CreatedAt = p.CreatedAt,
                    UpdatedAt = p.UpdatedAt,
                    ProtectionNumber = p.ProtectionNumber,
                    MajorPhotoImageId = p.MonumentPhotos.Where(p => p.MajorPhoto).FirstOrDefault()?.PhotoId
                };
                monument.Condition = conditionLocalizedRepository.Get(cultureCode, monument.ConditionId).Result;
                if (!MinimizeResult)
                {
                    monument.City = cityLocalizedRepository.Get(cultureCode, monument.CityId).Result;
                    monument.Sources = p.Sources.Adapt<SourceViewModel[]>().ToList();
                    monument.MonumentPhotos = p.MonumentPhotos.Adapt<MonumentPhotoViewModel[]>().ToList();
                    monument.Status = statusLocalizedRepository.Get(cultureCode, monument.StatusId).Result;
                }

                return monument;
            };
        }

        protected override IQueryable<Monument> IncludeNecessaryProps(IQueryable<Monument> source)
        {
            var result = source.Include(p => p.Name)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.Status)
                .Include(p => p.MonumentPhotos);
            if (!MinimizeResult)
            {
                return result.Include(p => p.Description)
                    .ThenInclude(p => p.Localizations)
                    .Include(p => p.Sources)
                    .Include(p => p.City);
            }

            return result;
        }
    }
}