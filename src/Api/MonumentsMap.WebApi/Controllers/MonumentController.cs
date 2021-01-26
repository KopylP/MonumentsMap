using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Filters;

namespace MonumentsMap.Controllers
{
    [ApiVersion("1.0")]
    public class MonumentController : LocalizedController<IMonumentService, LocalizedMonumentDto, EditableLocalizedMonumentDto>
    {
        private IMonumentPhotoService _monumentPhotoService;
        public MonumentController(IMonumentService localizedRestService, IMonumentPhotoService monumentPhotoService) : base(localizedRestService)
        {
            _monumentPhotoService = monumentPhotoService;
        }

        public async override Task<IActionResult> Get([FromQuery] string cultureCode)
        {
            if (User.Identity.IsAuthenticated && HttpContext.Request.Query.ContainsKey("hidden"))
            {
                var hidden = Convert.ToBoolean(HttpContext.Request.Query["hidden"].ToString());
                if (hidden)
                {
                    return Ok(await localizedRestService.GetAsync(cultureCode));
                }
            }

            var monuments = await localizedRestService.GetAccepted(cultureCode);

            return Ok(monuments);
        }

        public async override Task<IActionResult> Get(int id, [FromQuery] string cultureCode)
        {
            LocalizedMonumentDto monument = null;
            try
            {
                monument = await localizedRestService.GetAsync(id, cultureCode);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            if (!monument.Accepted && !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new UnauthorizedError());
            }
            return Ok(monument);
        }

        [HttpGet("filter")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> Get(
            [FromQuery(Name = "statuses[]")] int[] statuses,
            [FromQuery(Name = "conditions[]")] int[] conditions,
            [FromQuery(Name = "cities[]")] int[] cities,
            [FromQuery] int? startYear,
            [FromQuery] int? endYear,
            [FromQuery] string cultureCode
        )
        {
            var monumentFilterParams = new MonumentFilterParameters
            {
                Statuses = statuses,
                Conditions = conditions,
                Cities = cities,
                StartYear = startYear,
                EndYear = endYear,
                CultureCode = cultureCode
            };
            var monuments = await localizedRestService.GetByFilterAsync(monumentFilterParams);
            return Ok(monuments);
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
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
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
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }
            return Ok(monumentId);
        }

        [HttpGet("{id:int}/participants")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> GetMonumentParticipants([FromRoute] int id, [FromQuery] string cultureCode)
        {
            var participants = await localizedRestService.GetLocalizedParticipants(id, cultureCode);
            return Ok(participants);
        }

        [HttpGet("{id:int}/monumentPhotos")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> MonumentPhotos([FromRoute] int id, [FromQuery] string cultureCode)
        {
            var monumentPhotos = await _monumentPhotoService.FindAsync(cultureCode, p => p.MonumentId == id);
            return Ok(monumentPhotos);
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
                return NotFound(new NotFoundError(ex.Message));
            }
            var monumentPhotos = await _monumentPhotoService.FindAsync(cultureCode, p => p.MonumentId == id);
            return Ok(monumentPhotos);
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
                return NotFound(new NotFoundError(ex.Message));
            }
            return Ok(participants.Adapt<ParticipantDto[]>());
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
                return NotFound(new NotFoundError(ex.Message));
            }
            if (!monument.Accepted && !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new UnauthorizedError());
            }
            return Ok(monument);
        }
    }
}