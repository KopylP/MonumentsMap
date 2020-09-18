using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Extensions;

namespace MonumentsMap.Data.Repositories
{
    public class CityLocalizedRepository 
        : LocalizedRepository<LocalizedCity, EditableLocalizedCity, City, ApplicationContext>,
        ICityLocalizedRepository
    {
        public CityLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        protected override EditableLocalizedCity GetEditableLocalizedEntity(City entity) => new EditableLocalizedCity
        {
            Id = entity.Id,
            Name = entity.Name.GetCultureValuePairs()
        };

        protected override Func<City, LocalizedCity> GetSelectHandler(string cultureCode)
        {

            return p => 
            {
                var localization = p.Name.Localizations.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Name = localization?.Value ?? p.Name.Localizations.FirstOrDefault().Value;
                return new LocalizedCity
                {
                    Id = p.Id,
                    Name = Name
                };
            };
        }

        protected override IQueryable<City> IncludeNecessaryProps(IQueryable<City> source)
        {
            return source.Include(p => p.Name).ThenInclude(p => p.Localizations);
        }
    }
}