using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Api.Errors;
using MonumentsMap.Api.Exceptions;
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
            TLocalizedEntity localizedEntity = null;
            try
            {
                localizedEntity = await localizedRepository.Get(cultureCode, id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            return Ok(localizedEntity);
        }
        [HttpPost]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Post([FromBody] TEditableLocalizedEntity editableLocalizedEntity)
        {
            TEntity entity = null;
            try
            {
                entity = await localizedRepository.Create(editableLocalizedEntity);
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(entity);
        }
        [HttpPut]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Put([FromBody] TEditableLocalizedEntity editableLocalizedCity)
        {
            TEntity entity = null;
            try
            {
                entity = await localizedRepository.Update(editableLocalizedCity);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(entity);
        }
        [HttpDelete("{id}")]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Delete(int id)
        {
            TEntity entity;
            try
            {
                entity = await localizedRepository.Remove(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(entity);
        }
        [HttpGet("{id:int}/editable")]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Editable(int id)
        {
            TEditableLocalizedEntity editableLocalizedEntity = null;
            try
            {
                editableLocalizedEntity = await localizedRepository.GetEditableLocalizedEntity(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            return Ok(editableLocalizedEntity);
        }

    }
}