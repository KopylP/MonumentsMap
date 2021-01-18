using Microsoft.EntityFrameworkCore;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Application.Extensions;

namespace MonumentsMap.Core.Services.Monuments
{
    public class ParticipantService : IParticipantService
    {
        private IParticipantRepository _participantRepository;
        public ParticipantService(IParticipantRepository participantRepository)
        {
            _participantRepository = participantRepository;
        }

        public async Task<int> CreateAsync(EditableLocalizedParticipantDto model)
        {
            var entity = model.CreateEntity();
            await _participantRepository.Add(entity);
            await _participantRepository.SaveChangeAsync();
            return entity.Id;

        }

        public async Task<int> EditAsync(EditableLocalizedParticipantDto model)
        {
            var participant = await _participantRepository.Get(model.Id,
                p => p.Name.Localizations);
            var entity = model.CreateEntity(participant);
            await _participantRepository.Update(entity);

            await _participantRepository.SaveChangeAsync();

            return entity.Id;
        }

        public async Task<IEnumerable<LocalizedParticipantDto>> GetAsync(string cultureCode)
        {
            var participants = _participantRepository.GetQuery();
            participants = participants.Include(prop => prop.Name.Localizations);

            var result = from participant in participants
                         select new LocalizedParticipantDto
                         {
                             Id = participant.Id,
                             Name = participant.Name.GetNameByCode(cultureCode),
                             ParticipantRole = participant.ParticipantRole,
                             DefaultName = participant.DefaultName
                         };

            return await result.ToListAsync();
        }

        public async Task<LocalizedParticipantDto> GetAsync(int id, string cultureCode)
        {
            var participant = await _participantRepository.Get(id, p => p.Name.Localizations);

            return new LocalizedParticipantDto
            {
                Id = participant.Id,
                Name = participant.Name.GetNameByCode(cultureCode),
                ParticipantRole = participant.ParticipantRole,
                DefaultName = participant.DefaultName
            };
        }

        public async Task<EditableLocalizedParticipantDto> GetEditable(int id)
        {
            var participant = await _participantRepository.Get(id, p => p.Name.Localizations);

            return new EditableLocalizedParticipantDto
            {
                Id = participant.Id,
                Name = participant.Name.GetCultureValuePairs(),
                ParticipantRole = participant.ParticipantRole,
                DefaultName = participant.DefaultName
            };
        }

        public async Task<int> RemoveAsync(int id)
        {
            await _participantRepository.Delete(id);
            await _participantRepository.SaveChangeAsync();
            return id;
        }
    }
}
