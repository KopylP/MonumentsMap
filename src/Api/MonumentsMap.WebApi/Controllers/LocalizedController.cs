using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Services;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Filters;

namespace MonumentsMap.WebApi.Controllers
{
    public class LocalizedController<TLocalizedRestService, TLocalizedEntity, TEditableLocalizedEntity, TFilter> : BaseController
    where TLocalizedRestService : ILocalizedRestService<TLocalizedEntity, TEditableLocalizedEntity, TFilter>
    where TLocalizedEntity : BaseLocalizedDto
    where TEditableLocalizedEntity : BaseEditableLocalizedDto
    where TFilter : BaseRequestFilterDto
    {
        protected readonly TLocalizedRestService localizedRestService;
        protected readonly string DefaultCulture;

        public LocalizedController(TLocalizedRestService localizedRestService, IConfiguration configuration)
        {
            this.localizedRestService = localizedRestService;
            DefaultCulture = configuration["DefaultLanguage"];
        }
        [HttpGet]
        public async virtual Task<IActionResult> Get([FromQuery] string cultureCode, [FromQuery] TFilter filter)
        {
            cultureCode = SafetyGetCulture(cultureCode);
            
            var localizedEntities = await localizedRestService.GetAsync(cultureCode, filter);
            return PagingList(localizedEntities);
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
                return NotFoundResponse(ex.Message);
            }
            return Ok(localizedEntity);
        }
        [HttpPost]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Post([FromBody] TEditableLocalizedEntity editableLocalizedEntity)
        {
            int entityId = 0;
            try
            {
                entityId = await localizedRestService.CreateAsync(editableLocalizedEntity);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
            return Ok(entityId);
        }
        [HttpPut]
        [Authorize(Roles = "Editor")]
        public async virtual Task<IActionResult> Put([FromBody] TEditableLocalizedEntity editableLocalizedCity)
        {
            int entityId = 0;
            try
            {
                entityId = await localizedRestService.EditAsync(editableLocalizedCity);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
            return Ok(entityId);
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
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
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
                return NotFoundResponse(ex.Message);
            }
            return Ok(editableLocalizedEntity);
        }

        protected string SafetyGetCulture(string cultureCode)
        {
            if (string.IsNullOrEmpty(cultureCode)) return DefaultCulture;
            return cultureCode;
        }
    }
}