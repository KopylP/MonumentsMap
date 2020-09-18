using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Data;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Filters;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalizedController<TLocalizedRepository, TLocalizedEntity, TEditableLocalizedEntity, TEntity> : ControllerBase
    where TLocalizedRepository : ILocalizedRepository<TLocalizedEntity, TEditableLocalizedEntity, TEntity>
    where TLocalizedEntity : LocalizedEntity
    where TEntity : Entity
    where TEditableLocalizedEntity : EditableLocalizedEntity<TEntity>
    {
        protected readonly TLocalizedRepository localizedRepository;
        protected readonly string DefaultCulture;

        public LocalizedController(TLocalizedRepository localizedRepository)
        {
            this.localizedRepository = localizedRepository;
        }
        [HttpGet]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async virtual Task<IActionResult> Get([FromQuery] string cultureCode)
        {
            var localizedEntities = await localizedRepository.GetAll(cultureCode);
            return Ok(localizedEntities);
        }
        [HttpGet("{id:int}")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async virtual Task<IActionResult> Get(int id, [FromQuery] string cultureCode)
        {
            var localizedEntity = await localizedRepository.Get(cultureCode, id);
            return Ok(localizedEntity);
        }
        [HttpPost]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Post([FromBody] TEditableLocalizedEntity editableLocalizedEntity)
        {
            var entities = await localizedRepository.Create(editableLocalizedEntity);
            return Ok(entities);
        }
        [HttpPut]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Put([FromBody] TEditableLocalizedEntity editableLocalizedCity)
        {
            var entities = await localizedRepository.Update(editableLocalizedCity);
            return Ok(entities);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Delete(int id)
        {
            var entity = await localizedRepository.Remove(id);
            if(entity == null) return NotFound(); //TODO handle error
            return Ok(entity);
        }
        [HttpGet("{id:int}/editable")]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Editable(int id)
        {
            var editableEntity = await localizedRepository.GetEditableLocalizedEntity(id);
            if(editableEntity == null) return NotFound(); //TODO handle error
            return Ok(editableEntity); 
        }

    }
}