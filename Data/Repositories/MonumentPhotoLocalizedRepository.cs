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
    public class MonumentPhotoLocalizedRepository : LocalizedRepository<LocalizedMonumentPhoto, EditableLocalizedMonumentPhoto, MonumentPhoto, ApplicationContext>
    {
        public MonumentPhotoLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        public override Func<MonumentPhoto, LocalizedMonumentPhoto> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var lmp = new LocalizedMonumentPhoto
                {
                    Id = p.Id,
                    Year = p.Year,
                    Period = p.Period,
                    PhotoId = p.PhotoId,
                    MonumentId = p.MonumentId,
                    MajorPhoto = p.MajorPhoto
                };
                var localizationDescription = p.Description?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode);
                var description = localizationDescription?.Value ?? "";
                lmp.Description = description;
                if (!MinimizeResult)
                {
                    lmp.Sources = p.Sources.Adapt<SourceViewModel[]>().ToList();
                    lmp.Photo = p.Photo;
                }
                return lmp;
            };
        }

        public override IQueryable<MonumentPhoto> IncludeNecessaryProps(IQueryable<MonumentPhoto> source)
        {
            source = source.Include(p => p.Description)
                .ThenInclude(p => p.Localizations);
            if (MinimizeResult) return source;
            return source
                .Include(p => p.Photo)
                .Include(p => p.Sources);
        }
    }
}
