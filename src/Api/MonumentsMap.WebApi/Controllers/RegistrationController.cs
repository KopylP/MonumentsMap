using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly IInvitationService _invitationService;
        private readonly UserManager<ApplicationUser> _userManager;

        public RegistrationController(IInvitationService invitationService, UserManager<ApplicationUser> userManager)
        {
            _invitationService = invitationService;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationUserDto registrationUserViewModel)
        {
            var result = await _invitationService
                .CheckInvitationCodeAsync(registrationUserViewModel.Email, registrationUserViewModel.InviteCode);
            switch(result)
            {
                case InvitationResult.InvalidInvitationCode:
                    return StatusCode(403, new ForbidError("Invitation code is incorrect"));
                case InvitationResult.InvitationDoesNotExistOrExpired:
                    return NotFound(new NotFoundError("Invitation code doesn`t exist or already expired"));
                case InvitationResult.UserAlreadyExists:
                    return Conflict(new ConflictError("User already exists"));
            }

            var user = new ApplicationUser
            {
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                DisplayName = registrationUserViewModel.DisplayName,
                Email = registrationUserViewModel.Email,
                UserName = registrationUserViewModel.Email
            };

            var registerResult = await _userManager.CreateAsync(user, registrationUserViewModel.Password);
            if(!registerResult.Succeeded)
                return StatusCode(500, new InternalServerError());
            return Ok(UserDto.FromUser(user));
        }

        [HttpPost("Invite")]
        public async Task<IActionResult> Invite([FromBody] InvitationRequestDto invitationRequestViewModel)
        {
            var inviteResponseModel = await _invitationService
                .CreateInviteAsync(invitationRequestViewModel.Email);

            if(inviteResponseModel == null) 
                return Conflict(new ConflictError("User already exists"));

            await _invitationService.InvitePersonAsync(inviteResponseModel);
            return Ok(inviteResponseModel);
        }
    }
}