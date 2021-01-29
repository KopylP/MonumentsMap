using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Application.Extensions;
using MonumentsMap.Application.Dto.Monuments.Filters;
using AutoMapper;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Contracts.Paging;

namespace MonumentsMap.Core.Services.Monuments
{
    public class ParticipantService : IParticipantService
    {
        private IParticipantRepository _participantRepository;
        private IMapper _mapper;
        public ParticipantService(IParticipantRepository participantRepository, IMapper mapper)
        {
            _participantRepository = participantRepository;
            _mapper = mapper;
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

        public async Task<PagingList<LocalizedParticipantDto>> GetAsync(string cultureCode, ParticipantRequestFilterDto filterDto)
        {
            filterDto ??= ParticipantRequestFilterDto.Empty;

            var filter = _mapper.Map<ParticipantFilterParameters>(filterDto);

            var participantsPagingList = await  _participantRepository.Filter(filter,
                prop => prop.Name.Localizations);

            var localizedParticipants = (from participant in participantsPagingList.Items
                         select new LocalizedParticipantDto
                         {
                             Id = participant.Id,
                             Name = participant.Name.GetNameByCode(cultureCode),
                             ParticipantRole = participant.ParticipantRole,
                             DefaultName = participant.DefaultName
                         }).ToList();

            return new PagingList<LocalizedParticipantDto>(localizedParticipants, participantsPagingList.PagingInformation);
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
