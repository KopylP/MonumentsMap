using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class MonumentPhotoLocalizedRepository : LocalizedRepository<LocalizedMonumentPhoto, EditableLocalizedMonumentPhoto, MonumentPhoto, ApplicationContext>
    {
        public MonumentPhotoLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        public override Func<MonumentPhoto, LocalizedMonumentPhoto> GetSelectHandler(string cultureCode, bool minimized = false)
        {
            return p =>
            {
                var localizationDescription = p.Description?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Description = localizationDescription?.Value ?? "";
                return new LocalizedMonumentPhoto
                {
                    Id = p.Id,
                    Year = p.Year,
                    Period = p.Period,
                    PhotoId = p.PhotoId,
                    Photo = p.Photo,
                    Description = Description,
                    Sources = p.Sources
                };
            };
        }

        public override IQueryable<MonumentPhoto> IncludeNecessaryProps(IQueryable<MonumentPhoto> source, bool minimized = false)
        {
            return source
                .Include(p => p.Description)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.Photo)
                .Include(p => p.Sources);
        }
    }
}
