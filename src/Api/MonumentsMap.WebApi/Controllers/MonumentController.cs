using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.Filters;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Filters;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    public class MonumentController : LocalizedController<IMonumentService, LocalizedMonumentDto, EditableLocalizedMonumentDto, MonumentRequestFilterDto>
    {
        private IMonumentPhotoService _monumentPhotoService;
        public MonumentController(IMonumentService localizedRestService, 
            IMonumentPhotoService monumentPhotoService, 
            IConfiguration configuration) : base(localizedRestService, configuration)
        {
            _monumentPhotoService = monumentPhotoService;
        }

        public async override Task<IActionResult> Get([FromQuery] string cultureCode, [FromQuery] MonumentRequestFilterDto monumentFilterParams)
        {
            cultureCode = SafetyGetCulture(cultureCode);

            if (!User.Identity.IsAuthenticated && monumentFilterParams.Hidden)
            { 
                return UnauthorizedResponse("You cannot see hidden monuments");
            }

            var monuments = await localizedRestService.GetAsync(cultureCode, monumentFilterParams);
            return PagingList(monuments, JsonSerializerSettings);
        }

        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async override Task<IActionResult> Get(int id, [FromQuery] string cultureCode)
        {
            LocalizedMonumentDto monument = null;
            try
            {
                monument = await localizedRestService.GetAsync(id, cultureCode);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            if (!monument.Accepted && !User.Identity.IsAuthenticated)
            {
                return UnauthorizedResponse();
            }
            return new JsonResult(monument, JsonSerializerSettings);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilter(
            [FromQuery] MonumentRequestFilterDto monumentFilterParams,
            [FromQuery] string cultureCode
        )
        {
            cultureCode = SafetyGetCulture(cultureCode);

            if (!User.Identity.IsAuthenticated && monumentFilterParams.Hidden)
            {
                return UnauthorizedResponse("You cannot see hidden monuments");
            }

            var monuments = await localizedRestService.GetAsync(cultureCode, monumentFilterParams);
            return PagingList(monuments, JsonSerializerSettings);
        }

        [HttpPatch("{id:int}/toogle/accepted")]
        [Authorize(Roles = "Editor")]
        public async Task<IActionResult> ToogleAccepted(int id)
        {
            int monumentId;
            try
            {
                monumentId = await localizedRestService.ToogleMonument(id);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }

            return Ok(monumentId);
        }

        [HttpPatch("{id:int}/participants")]
        public async Task<IActionResult> EditParticipants([FromRoute] int id, IEnumerable<ParticipantDto> participantViewModels)
        {
            int monumentId;
            try
            {
                monumentId = await localizedRestService.EditMonumentParticipantsAsync(new MonumentParticipantsDto
                {
                    MonumentId = id,
                    Participants = participantViewModels
                });
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            catch (InternalServerErrorException ex)
            {
                return InternalServerErrorResponse(ex.Message);
            }
            return Ok(monumentId);
        }

        [HttpGet("{id:int}/participants")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> GetMonumentParticipants([FromRoute] int id, [FromQuery] string cultureCode)
        {
            var participants = await localizedRestService.GetLocalizedParticipants(id, cultureCode);
            return new JsonResult(participants, JsonSerializerSettings);
        }

        [HttpGet("{id:int}/monumentPhotos")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> MonumentPhotos([FromRoute] int id, [FromQuery] string cultureCode)
        {
            var monumentPhotos = await _monumentPhotoService.FindAsync(cultureCode, p => p.MonumentId == id);
            return new JsonResult(monumentPhotos, JsonSerializerSettings);
        }

        [HttpGet("{slug}/monumentPhotos")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> MonumentPhotosBySlug([FromRoute] string slug, [FromQuery] string cultureCode)
        {
            int id;
            try
            {
                id = await localizedRestService.GetMonumentIdBySlug(slug);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            var monumentPhotos = await _monumentPhotoService.FindAsync(cultureCode, p => p.MonumentId == id);
            return new JsonResult(monumentPhotos, JsonSerializerSettings);
        }

        [Authorize(Roles = "Editor")]
        [HttpGet("{id:int}/participants/raw")]
        public async Task<IActionResult> GetRawMonumentParticipants(int id)
        {
            IEnumerable<ParticipantDto> participants = null;
            try
            {
                participants = await localizedRestService.GetRawParticipantsAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            return new JsonResult(participants, JsonSerializerSettings);
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug, string cultureCode)
        {
            LocalizedMonumentDto monument = null;
            try
            {
                monument = await localizedRestService.GetMonumentBySlug(slug, cultureCode);
            }
            catch (NotFoundException ex)
            {
                return NotFoundResponse(ex.Message);
            }
            if (!monument.Accepted && !User.Identity.IsAuthenticated)
            {
                return UnauthorizedResponse();
            }
            return new JsonResult(monument, JsonSerializerSettings);
        }
    }
}