using Microsoft.EntityFrameworkCore;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Domain.Repository;
using MonumentsMap.Application.Extensions;

namespace MonumentsMap.Core.Services.Monuments
{
    public class ConditionService : IConditionService
    {
        private readonly IConditionRepository _conditionRepository;

        public ConditionService(IConditionRepository conditionRepository)
        {
            _conditionRepository = conditionRepository;
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

        public async Task<IEnumerable<LocalizedConditionDto>> GetAsync(string cultureCode)
        {
                var conditions = _conditionRepository.GetQuery();
                conditions = conditions
                    .Include(prop => prop.Name.Localizations)
                    .Include(p => p.Description.Localizations);

                var result = from condition in conditions
                             select new LocalizedConditionDto
                             {
                                 Id = condition.Id,
                                 Name = condition.Name.GetNameByCode(cultureCode),
                                 Description = condition.Description.GetNameByCode(cultureCode),
                                 Abbreviation = condition.Abbreviation
                             };

                return await result.ToListAsync();
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
