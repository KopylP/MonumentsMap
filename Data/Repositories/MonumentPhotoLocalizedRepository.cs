using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mapster;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Extensions;
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

        protected override EditableLocalizedMonumentPhoto GetEditableLocalizedEntity(MonumentPhoto entity) => new EditableLocalizedMonumentPhoto
        {
            Id = entity.Id,
            Year = entity.Year,
            Period = entity.Period,
            MonumentId = entity.MonumentId,
            PhotoId = entity.PhotoId,
            Sources = entity.Sources.Select(p =>
            {
                p.MonumentPhoto = null;
                return p;
            }).ToList(),
            Description = entity.Description.GetCultureValuePairs()
        };

        protected override Func<MonumentPhoto, LocalizedMonumentPhoto> GetSelectHandler(string cultureCode)
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

        protected override IQueryable<MonumentPhoto> IncludeNecessaryProps(IQueryable<MonumentPhoto> source)
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
