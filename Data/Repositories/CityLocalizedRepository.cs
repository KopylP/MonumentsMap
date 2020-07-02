using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class CityLocalizedRepository : LocalizedRepository<LocalizedCity, EditableLocalizedCity, City, ApplicationContext>
    {
        public CityLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        public override Func<City, LocalizedCity> GetSelectHandler(string cultureCode)
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

        public override IQueryable<City> IncludeNessesaryProps(IQueryable<City> source)
        {
            return source.Include(p => p.Name).ThenInclude(p => p.Localizations);
        }
    }
}