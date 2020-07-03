using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class ConditionLocalizedRepository : LocalizedRepository<LocalizedCondition, EditableLocalizedCondition, Condition, ApplicationContext>
    {
        public ConditionLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        public override Func<Condition, LocalizedCondition> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var localizationName = p.Name.Localizations.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Name = localizationName?.Value ?? p.Name.Localizations.FirstOrDefault().Value;
                var localizationDescription = p.Description?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Description = localizationDescription?.Value ?? "";
                return new LocalizedCondition
                {
                    Id = p.Id,
                    Abbreviation = p.Abbreviation,
                    Name = Name,
                    Description = Description,
                };
            };
        }

        public override IQueryable<Condition> IncludeNecessaryProps(IQueryable<Condition> source)
        {
            return source
                .Include(p => p.Name)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.Description)
                .ThenInclude(p => p.Localizations);
        }
    }
}