using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Contracts.Exceptions;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiVersion("1.0")]
    public class RegistrationController : BaseController
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
                return NotFoundResponse(ex.Message);
            }
            catch (ConflictException ex)
            {
                return ConflictResponse(ex.Message);
            }
            catch (ApiException ex)
            {
                return ConflictResponse(ex.Message);
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
                return ConflictResponse(ex.Message);
            }

            return Ok(result);
        }
    }
}