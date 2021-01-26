using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Contracts.Exceptions;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly IInvitationService _invitationService;

        public RegistrationController(IInvitationService invitationService)
        {
            _invitationService = invitationService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUserRequestDto registrationUserViewModel)
        {
            UserResponseDto result = null;

            try
            {
               result = await _invitationService.RegisterAsync(registrationUserViewModel);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new NotFoundError(ex.Message));
            }
            catch (ConflictException ex)
            {
                return Conflict(new ConflictError(ex.Message));
            }
            catch (ApiException ex)
            {
                return Conflict(new InternalServerError(ex.Message));
            }

            return Ok(result);
        }

        [HttpPost("Invite")]
        public async Task<IActionResult> Invite([FromBody] InvitationRequestDto invitationRequestViewModel)
        {
            InvitationResponseDto result = null;

            try
            {
                result = await _invitationService.InviteAsync(invitationRequestViewModel);
            }
            catch (ConflictException ex)
            {
                return Conflict(new ConflictError(ex.Message));
            }

            return Ok(result);
        }
    }
}