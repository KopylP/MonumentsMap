using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Extensions;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class StatusLocalizedRepository : LocalizedRepository<LocalizedStatus, EditableLocalizedStatus, Status, ApplicationContext>
    {
        public StatusLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        protected override EditableLocalizedStatus GetEditableLocalizedEntity(Status entity) => new EditableLocalizedStatus
        {
            Id = entity.Id,
            Abbreviation = entity.Abbreviation,
            Name = entity.Name.GetCultureValuePairs(),
            Description = entity.Description.GetCultureValuePairs()
        };

        protected override Func<Status, LocalizedStatus> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var localizationName = p.Name.Localizations.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Name = localizationName?.Value ?? p.Name.Localizations.FirstOrDefault().Value;
                var localizationDescription = p.Description?.Localizations?.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Description = localizationDescription?.Value ?? "";
                return new LocalizedStatus
                {
                    Id = p.Id,
                    Abbreviation = p.Abbreviation,
                    Name = Name,
                    Description = Description,
                };
            };
        }

        protected override IQueryable<Status> IncludeNecessaryProps(IQueryable<Status> source)
        {
            return source
                .Include(p => p.Name)
                .ThenInclude(p => p.Localizations)
                .Include(p => p.Description)
                .ThenInclude(p => p.Localizations);
        }

    }
}