using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Enumerations;
using MonumentsMap.Entities.FilterParameters;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Extensions;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentLocalizedRepository
        : LocalizedRepository<LocalizedMonument, EditableLocalizedMonument, Monument, ApplicationContext>,
        IMonumentLocalizedRepository
    {
        private readonly IStatusLocalizedRepository statusLocalizedRepository;
        private readonly ICityLocalizedRepository cityLocalizedRepository;
        private readonly IConditionLocalizedRepository conditionLocalizedRepository;
        public MonumentLocalizedRepository(
            ApplicationContext context,
            ICityLocalizedRepository cityLocalizedRepository,
            IConditionLocalizedRepository conditionLocalizedRepository,
            IStatusLocalizedRepository statusLocalizedRepository
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

        private IQueryable<Monument> IncludeMinimizeNecessaryProps(IQueryable<Monument> source)
        {
            return source.Include(p => p.Name)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.Status)
                .Include(p => p.MonumentPhotos);
        }

        protected override IQueryable<Monument> IncludeNecessaryProps(IQueryable<Monument> source)
        {
            var result = IncludeMinimizeNecessaryProps(source);
            if (!MinimizeResult)
            {
                return result.Include(p => p.Description)
                    .ThenInclude(p => p.Localizations)
                    .Include(p => p.Sources)
                    .Include(p => p.City);
            }

            return result;
        }

        private bool IfRangeInEndYear(int endYear, (int startYear, int endYear) range) => endYear >= range.startYear;
        private bool IfRangeInStartYear(int startYear, (int startYear, int endYear) range) => startYear <= range.endYear;

        private (int, int) RangeByPeriod(int year, Period period)
        {
            return period switch
            {
                Period.Year => (year, year),
                Period.StartOfCentury => ((year - 1) * 100, ((year - 1) * 100 + 30)), //[00, 30]
                Period.MiddleOfCentury => ((year - 1) * 100 + 31, (year - 1) * 100 + 70),//[41, 70]
                Period.EndOfCentury => ((year - 1) * 100 + 71, year * 100 - 1),//[71, 99]
                Period.Decades => (year, year + 9),
                _ => (year, year)
            };
        }

        public async Task<IEnumerable<LocalizedMonument>> GetByFilterAsync(MonumentFilterParameters parameters)
        {
            MinimizeResult = true;
            IQueryable<Monument> monuments = context.Monuments.Where(p => p.Accepted);
            if (parameters.Statuses.Any())
            {
                monuments =
                    from monument in monuments
                    where parameters.Statuses.Contains(monument.StatusId)
                    select monument;
            }
            if (parameters.Conditions.Any())
            {
                monuments =
                    from monument in monuments
                    where parameters.Conditions.Contains(monument.ConditionId)
                    select monument;
            }
            if (parameters.Cities.Any())
            {
                monuments =
                    from monument in monuments
                    where parameters.Cities.Contains(monument.CityId)
                    select monument;
            }
            monuments = (await IncludeMinimizeNecessaryProps(monuments).ToListAsync()).AsQueryable();
            if(parameters.StartYear != null)
            {
                monuments = 
                    from monument in monuments
                    where IfRangeInStartYear(parameters.StartYear.GetValueOrDefault(), RangeByPeriod(monument.Year, monument.Period))
                    select monument;
            }
            if(parameters.EndYear != null)
            {
                monuments = 
                    from monument in monuments
                    where IfRangeInEndYear(parameters.EndYear.GetValueOrDefault(), RangeByPeriod(monument.Year, monument.Period))
                    select monument;
            }
            return monuments.Select(GetSelectHandler(parameters.CultureCode));
        }
    }
}