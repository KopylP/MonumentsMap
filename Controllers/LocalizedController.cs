using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Data;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Filters;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalizedController<TLocalizedRepository, TLocalizedEntity, TEditableLocalizedEntity, TEntity> : ControllerBase
    where TLocalizedRepository : LocalizedRepository<TLocalizedEntity, TEditableLocalizedEntity, TEntity, ApplicationContext>
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