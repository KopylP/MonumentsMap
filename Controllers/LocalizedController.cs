using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Data;
using MonumentsMap.Data.Repositories;
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
        public async Task<IActionResult> Get([FromQuery] string cultureCode = "uk-UA")
        {
            var localizedEntities = await localizedRepository.GetAll(cultureCode);
            return Ok(localizedEntities);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id, [FromQuery] string cultureCode = "uk-UA")
        {
            var localizedEntity = await localizedRepository.Get(cultureCode, id);
            return Ok(localizedEntity);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TEditableLocalizedEntity editableLocalizedEntity)
        {
            var entities = await localizedRepository.Create(editableLocalizedEntity);
            return Ok(entities);
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] TEditableLocalizedEntity editableLocalizedCity)
        {
            var entities = await localizedRepository.Update(editableLocalizedCity);
            return Ok(entities);
        }
    }
}