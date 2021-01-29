using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Application.Extensions;
using AutoMapper;
using MonumentsMap.Contracts.Paging;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Domain.FilterParameters;

namespace MonumentsMap.Core.Services.Monuments
{
    public class ConditionService : IConditionService
    {
        private readonly IConditionRepository _conditionRepository;
        private readonly IMapper _mapper;

        public ConditionService(IConditionRepository conditionRepository, IMapper mapper)
        {
            _conditionRepository = conditionRepository;
            _mapper = mapper;

        }

        public async Task<int> CreateAsync(EditableLocalizedConditionDto model)
        {
                var entity = model.CreateEntity();
                await _conditionRepository.Add(entity);
                await _conditionRepository.SaveChangeAsync();
                return entity.Id;
        }

        public async Task<int> EditAsync(EditableLocalizedConditionDto model)
        {
                var condition = await _conditionRepository.Get(model.Id,
                    p => p.Name.Localizations,
                    x => x.Description.Localizations);

                var entity = model.CreateEntity(condition);
                await _conditionRepository.Update(entity);

                await _conditionRepository.SaveChangeAsync();

                return entity.Id;
        }

        public async Task<PagingList<LocalizedConditionDto>> GetAsync(string cultureCode, ConditionRequestFilterDto filterDto)
        {
            filterDto ??= ConditionRequestFilterDto.Empty;

            var filter = _mapper.Map<ConditionFilterParameters>(filterDto);

            var conditionsPagingList = await _conditionRepository
                .Filter(filter, prop => prop.Name.Localizations, p => p.Description.Localizations);

                var conditionsDto = (from condition in conditionsPagingList.Items
                             select new LocalizedConditionDto
                             {
                                 Id = condition.Id,
                                 Name = condition.Name.GetNameByCode(cultureCode),
                                 Description = condition.Description.GetNameByCode(cultureCode),
                                 Abbreviation = condition.Abbreviation
                             }).ToList();

                return new PagingList<LocalizedConditionDto>(conditionsDto, conditionsPagingList.PagingInformation);
        }

        public async Task<LocalizedConditionDto> GetAsync(int id, string cultureCode)
        {
                var condition = await _conditionRepository.Get(id, 
                    p => p.Name.Localizations,
                    prop => prop.Description.Localizations);

                return new LocalizedConditionDto
                {
                    Id = condition.Id,
                    Name = condition.Name.GetNameByCode(cultureCode),
                    Description = condition.Description.GetNameByCode(cultureCode),
                    Abbreviation = condition.Abbreviation
                };
        }

        public async Task<EditableLocalizedConditionDto> GetEditable(int id)
        {
                var condition = await _conditionRepository.Get(id, p => p.Name.Localizations);

                return new EditableLocalizedConditionDto
                {
                    Id = condition.Id,
                    Name = condition.Name.GetCultureValuePairs(),
                    Abbreviation = condition.Abbreviation,
                    Description = condition.Description.GetCultureValuePairs()
                };
        }

        public async Task<int> RemoveAsync(int id)
        {
                await _conditionRepository.Delete(id);
                await _conditionRepository.SaveChangeAsync();
                return id;
        }
    }
}
