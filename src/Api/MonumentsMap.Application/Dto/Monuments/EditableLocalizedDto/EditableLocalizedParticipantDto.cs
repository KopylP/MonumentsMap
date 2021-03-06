using System.Collections.Generic;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Domain.Models;
using MonumentsMap.Framework.Enums.Monuments;

namespace MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedParticipantDto : BaseEditableLocalizedDto
    {
        public string DefaultName { get; set; }
        public List<CultureValuePair> Name { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }

        public Participant CreateEntity(Participant entity = null)
        {
            Participant participant = null;
            if (entity != null)
            {
                participant = entity;
                participant.Name.Localizations.Clear();
            }
            else
            {
                participant = new Participant
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
            }
            participant.Id = Id;
            participant.DefaultName = DefaultName;
            participant.ParticipantRole = ParticipantRole;
            foreach (var cultureValue in Name)
            {
                participant.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValue.Culture,
                    Value = cultureValue.Value.Trim()
                });
            }
            return participant;
        }
    }
}