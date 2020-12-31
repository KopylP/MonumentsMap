using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Exceptions;
using MonumentsMap.Application.Services;
using MonumentsMap.Domain.Models;
using MonumentsMap.Filters;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocalizedController<TLocalizedRestService, TLocalizedEntity, TEditableLocalizedEntity, TEntity> : ControllerBase
    where TLocalizedRestService : ILocalizedRestService<TLocalizedEntity, TEditableLocalizedEntity, TEntity>
    where TLocalizedEntity : BaseLocalizedDto
    where TEntity : Entity
    where TEditableLocalizedEntity : BaseEditableLocalizedDto<TEntity>
    {
        protected readonly TLocalizedRestService localizedRestService;
        protected readonly string DefaultCulture;

        public LocalizedController(TLocalizedRestService localizedRestService)
        {
            this.localizedRestService = localizedRestService;
        }
        [HttpGet]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async virtual Task<IActionResult> Get([FromQuery] string cultureCode)
        {
            var localizedEntities = await localizedRestService.GetAsync(cultureCode);
            return Ok(localizedEntities);
        }
        [HttpGet("{id:int}")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async virtual Task<IActionResult> Get(int id, [FromQuery] string cultureCode)
        {
            TLocalizedEntity localizedEntity = null;
            try
            {
                localizedEntity = await localizedRestService.GetAsync(id, cultureCode);
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
                entity = await localizedRestService.CreateAsync(editableLocalizedEntity);
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
                entity = await localizedRestService.EditAsync(editableLocalizedCity);
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
            try
            {
                await localizedRestService.RemoveAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(id);
        }
        [HttpGet("{id:int}/editable")]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Editable(int id)
        {
            TEditableLocalizedEntity editableLocalizedEntity = null;
            try
            {
                editableLocalizedEntity = await localizedRestService.GetEditable(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            return Ok(editableLocalizedEntity);
        }

    }
}