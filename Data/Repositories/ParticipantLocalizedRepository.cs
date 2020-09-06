using System.Linq;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Extensions;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Data.Repositories
{
    public class ParticipantLocalizedRepository : LocalizedRepository<LocalizedParticipant, EditableLocalizedParticipant, Participant, ApplicationContext>
    {
        public ParticipantLocalizedRepository(ApplicationContext context) : base(context)
        {
        }

        protected override EditableLocalizedParticipant GetEditableLocalizedEntity(Participant entity) => new EditableLocalizedParticipant
        {
            Id = entity.Id,
            DefaultName = entity.DefaultName,
            Name = entity.Name.GetCultureValuePairs(),
            ParticipantRole = entity.ParticipantRole
        };

        protected override System.Func<Participant, LocalizedParticipant> GetSelectHandler(string cultureCode)
        {
            return p =>
            {
                var localizationName = p.Name.Localizations.FirstOrDefault(p => p.CultureCode == cultureCode);
                var Name = localizationName?.Value ?? p.Name.Localizations.FirstOrDefault().Value;
                return new LocalizedParticipant
                {
                    Id = p.Id,
                    DefaultName = p.DefaultName,
                    Name = Name,
                    ParticipantRole = p.ParticipantRole
                };
            };
        }

        protected override System.Linq.IQueryable<Participant> IncludeNecessaryProps(System.Linq.IQueryable<Participant> source) => source
                .Include(p => p.Name)
                .ThenInclude(p => p.Localizations);
    }
}