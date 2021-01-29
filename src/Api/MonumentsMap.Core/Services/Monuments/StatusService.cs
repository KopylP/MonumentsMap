using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Application.Extensions;
using AutoMapper;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Domain.FilterParameters;

namespace MonumentsMap.Core.Services.Monuments
{
    public class StatusService : IStatusService
    {
        private IStatusRepository _statusRepository;
        private IMapper _mapper;

        public StatusService(IStatusRepository statusRepository, IMapper mapper)
        {
            _statusRepository = statusRepository;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(EditableLocalizedStatusDto model)
        {
            var entity = model.CreateEntity();
            await _statusRepository.Add(entity);
            await _statusRepository.SaveChangeAsync();
            return entity.Id;
        }

        public async Task<int> EditAsync(EditableLocalizedStatusDto model)
        {
            var Status = await _statusRepository.Get(model.Id,
                p => p.Name.Localizations,
                x => x.Description.Localizations);

            var entity = model.CreateEntity(Status);
            await _statusRepository.Update(entity);

            await _statusRepository.SaveChangeAsync();

            return entity.Id;
        }

        public async Task<PagingList<LocalizedStatusDto>> GetAsync(string cultureCode, StatusRequestFilterDto filterDto)
        {
            filterDto ??= StatusRequestFilterDto.Empty;

            var filter = _mapper.Map<StatusFilterParameters>(filterDto);

            var statusesPagingList = await _statusRepository.Filter(filter, 
                prop => prop.Name.Localizations,
                p => p.Description.Localizations);

            var localizedStatuses = (from Status in statusesPagingList.Items
                         select new LocalizedStatusDto
                         {
                             Id = Status.Id,
                             Name = Status.Name.GetNameByCode(cultureCode),
                             Description = Status.Description.GetNameByCode(cultureCode),
                             Abbreviation = Status.Abbreviation
                         }).ToList();

            return new PagingList<LocalizedStatusDto>(localizedStatuses, statusesPagingList.PagingInformation);
        }

        public async Task<LocalizedStatusDto> GetAsync(int id, string cultureCode)
        {
            var Status = await _statusRepository.Get(id,
                p => p.Name.Localizations,
                prop => prop.Description.Localizations);

            return new LocalizedStatusDto
            {
                Id = Status.Id,
                Name = Status.Name.GetNameByCode(cultureCode),
                Description = Status.Description.GetNameByCode(cultureCode),
                Abbreviation = Status.Abbreviation
            };
        }

        public async Task<EditableLocalizedStatusDto> GetEditable(int id)
        {
            var Status = await _statusRepository.Get(id, p => p.Name.Localizations);

            return new EditableLocalizedStatusDto
            {
                Id = Status.Id,
                Name = Status.Name.GetCultureValuePairs(),
                Abbreviation = Status.Abbreviation,
                Description = Status.Description.GetCultureValuePairs()
            };
        }

        public async Task<int> RemoveAsync(int id)
        {
            await _statusRepository.Delete(id);
            await _statusRepository.SaveChangeAsync();
            return id;
        }
    }
}
