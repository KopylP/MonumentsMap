using System;
using System.Linq;
using Mapster;
using Microsoft.EntityFrameworkCore;
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

        public override Func<Monument, LocalizedMonument> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var localizationDescription = p.Description?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode)
                    ?? p.Description?.Localizations?.FirstOrDefault();
                var localizationName = p.Name?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode)
                    ?? p.Name?.Localizations?.FirstOrDefault();
                

                var monument =  new LocalizedMonument
                {
                    Id = p.Id,
                    Year = p.Year,
                    Period = p.Period,
                    Name = localizationName?.Value ?? "",
                    Description = localizationDescription?.Value ?? "",
                    CityId = p.CityId,
                    StatusId = p.StatusId,
                    ConditionId = p.ConditionId,
                    Accepted = p.Accepted,
                    Latitude = p.Latitude,
                    Longitude = p.Longitude
                };

                if(!MinimizeResult) {
                    monument.City = cityLocalizedRepository.Get(cultureCode, monument.CityId).Result;
                    monument.Condition = conditionLocalizedRepository.Get(cultureCode, monument.ConditionId).Result;
                    monument.Status = statusLocalizedRepository.Get(cultureCode, monument.StatusId).Result;
                    monument.Sources = p.Sources.Adapt<SourceViewModel[]>().ToList();
                    monument.MonumentPhotos = p.MonumentPhotos.Adapt<MonumentPhotoViewModel[]>().ToList();
                }

                return monument;
            };
        }

        public override IQueryable<Monument> IncludeNecessaryProps(IQueryable<Monument> source)
        {
            var result = source.Include(p => p.Name)
                .ThenInclude(p => p.Localizations);
            if (!MinimizeResult)
            {
                return result.Include(p => p.Description)
                    .ThenInclude(p => p.Localizations)
                    .Include(p => p.Sources)
                    .Include(p => p.MonumentPhotos);
            }

            return result;
        }
    }
}