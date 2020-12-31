using Microsoft.EntityFrameworkCore;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Core.Extensions;
using MonumentsMap.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Domain.Repository;

namespace MonumentsMap.Core.Services.Monuments
{
    public class StatusService : IStatusService
    {
        private IStatusRepository _statusRepository;
        public StatusService(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public async Task<Status> CreateAsync(EditableLocalizedStatusDto model)
        {
            var entity = model.CreateEntity();
            await _statusRepository.Add(entity);
            await _statusRepository.SaveChangeAsync();
            return entity;
        }

        public async Task<Status> EditAsync(EditableLocalizedStatusDto model)
        {
            var Status = await _statusRepository.Get(model.Id,
                p => p.Name.Localizations,
                x => x.Description.Localizations);

            var entity = model.CreateEntity(Status);
            await _statusRepository.Update(entity);

            await _statusRepository.SaveChangeAsync();

            return entity;
        }

        public async Task<IEnumerable<LocalizedStatusDto>> GetAsync(string cultureCode)
        {
            var Statuss = _statusRepository.GetQuery();
            Statuss = Statuss
                .Include(prop => prop.Name.Localizations)
                .Include(p => p.Description.Localizations);

            var result = from Status in Statuss
                         select new LocalizedStatusDto
                         {
                             Id = Status.Id,
                             Name = Status.Name.GetNameByCode(cultureCode),
                             Description = Status.Description.GetNameByCode(cultureCode),
                             Abbreviation = Status.Abbreviation
                         };

            return await result.ToListAsync();
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
