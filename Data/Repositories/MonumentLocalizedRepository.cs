using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentLocalizedRepository : LocalizedRepository<LocalizedMonument, EditableLocalizedMonument, Monument, ApplicationContext>
    {
        public MonumentLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        public override Func<Monument, LocalizedMonument> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var localizationDescription = p.Description?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode) 
                    ?? p.Description?.Localizations?.FirstOrDefault();
                var localizationName = p.Name?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode)
                    ?? p.Name?.Localizations?.FirstOrDefault();
                return new LocalizedMonument
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
                    Longitude = p.Longitude,
                    Sources = p.Sources
                };
            };
        }

        public override IQueryable<Monument> IncludeNecessaryProps(IQueryable<Monument> source)
        {
            return source
                .Include(p => p.Description)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.Name)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.City)
                .Include(p => p.Condition)
                .Include(p => p.Sources);
        }
    }
}