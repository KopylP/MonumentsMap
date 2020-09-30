using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Api.Errors;
using MonumentsMap.Api.Exceptions;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.FilterParameters;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;
using MonumentsMap.Filters;

namespace MonumentsMap.Controllers
{
    public class MonumentController : LocalizedController<IMonumentLocalizedRepository, LocalizedMonument, EditableLocalizedMonument, Monument>
    {
        #region private fields
        private readonly IMonumentPhotoLocalizedRepository _monumentPhotoLocalizedRepository;
        private readonly IMonumentService _monumentService;
        #endregion
        #region constructor
        public MonumentController(
            IMonumentLocalizedRepository localizedRepository,
            IMonumentPhotoLocalizedRepository monumentPhotoLocalizedRepository,
            IMonumentService monumentService
        ) : base(localizedRepository)
        {
            _monumentPhotoLocalizedRepository = monumentPhotoLocalizedRepository;
            _monumentService = monumentService;
        }
        #endregion

        #region REST methods
        [Authorize(Roles = "Editor")]
        public async override Task<IActionResult> Get([FromQuery] string cultureCode)
        {
            if (User.Identity.IsAuthenticated && HttpContext.Request.Query.ContainsKey("hidden"))
            {
                var hidden = Convert.ToBoolean(HttpContext.Request.Query["hidden"].ToString());
                if (hidden)
                {
                    return Ok(await localizedRepository.GetAll(cultureCode));
                }
            }

            var monuments = await localizedRepository.Find(cultureCode, p => p.Accepted);

            return Ok(monuments);
        }

        public async override Task<IActionResult> Get(int id, [FromQuery] string cultureCode)
        {
            LocalizedMonument monument = null;
            try
            {
                monument = await localizedRepository.Get(cultureCode, id);
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

        #endregion

        #region metods
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
            var monuments = await localizedRepository.GetByFilterAsync(monumentFilterParams);
            return Ok(monuments);
        }

        [HttpPatch("{id:int}/toogle/accepted")]
        [Authorize(Roles = "Editor")]
        public async Task<IActionResult> ToogleAccepted(int id)
        {
            Monument monument = null;
            try
            {
                monument = await _monumentService.ToogleMajorPhotoAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (InternalServerErrorException ex)
            {
                return StatusCode(500, new InternalServerError(ex.Message));
            }

            return Ok(monument);
        }

        [HttpPatch("{id:int}/participants")]
        public async Task<IActionResult> EditParticipants([FromRoute] int id, IEnumerable<ParticipantViewModel> participantViewModels)
        {
            Monument monument = null;
            try
            {
                monument = await _monumentService.EditMonumentParticipantsAsync(new MonumentParticipantsViewModel
                {
                    MonumentId = id,
                    ParticipantViewModels = participantViewModels
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
            return Ok(monument);
        }

        [HttpGet("{id:int}/participants")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> GetMonumentParticipants([FromRoute] int id, [FromQuery] string cultureCode)
        {
            var participants = await _monumentService.GetLocalizedParticipants(id, cultureCode);
            return Ok(participants);
        }

        [HttpGet("{id:int}/monumentPhotos")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> MonumentPhotos([FromRoute] int id, [FromQuery] string cultureCode)
        {
            var monumentPhotos = await _monumentPhotoLocalizedRepository.Find(cultureCode, p => p.MonumentId == id);
            return Ok(monumentPhotos);
        }

        [HttpGet("{slug}/monumentPhotos")]
        [ServiceFilter(typeof(CultureCodeResourceFilter))]
        public async Task<IActionResult> MonumentPhotosBySlug([FromRoute] string slug, [FromQuery] string cultureCode)
        {
            Monument monument = null;
            try
            {
                monument = await _monumentService.GetMonumentBySlug(slug);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            var monumentPhotos = await _monumentPhotoLocalizedRepository.Find(cultureCode, p => p.MonumentId == monument.Id);
            return Ok(monumentPhotos);
        }

        [Authorize(Roles = "Editor")]
        [HttpGet("{id:int}/participants/raw")]
        public async Task<IActionResult> GetRawMonumentParticipants(int id)
        {
            IEnumerable<Participant> participants = null;
            try
            {
                participants = await _monumentService.GetRawParticipantsAsync(id);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            return Ok(participants.Adapt<ParticipantViewModel[]>());
        }

        [HttpGet("{slug}")]
        public async Task<IActionResult> GetBySlug(string slug, string cultureCode)
        {
            LocalizedMonument monument = null;
            try
            {
                monument = await _monumentService.GetMonumentBySlug(slug, cultureCode);
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
        #endregion
    }
}