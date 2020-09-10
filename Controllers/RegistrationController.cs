using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Models;
using MonumentsMap.Services.enums;
using MonumentsMap.Services.Interfaces;
using MonumentsMap.ViewModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistrationController : ControllerBase
    {
        #region private fields
        private readonly IInvitationService _invitationService;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion
        #region constructor
        public RegistrationController(IInvitationService invitationService, UserManager<ApplicationUser> userManager)
        {
            _invitationService = invitationService;
            _userManager = userManager;
        }
        #endregion
        #region REST methods
        [HttpPost]
        public async Task<IActionResult> Register(RegistrationUserViewModel registrationUserViewModel)
        {
            var result = await _invitationService
                .CheckInvitationCodeAsync(registrationUserViewModel.Email, registrationUserViewModel.InviteCode);
            switch(result)
            {
                case InvitationResult.InvalidInvitationCode:
                    return Forbid(); //TODO handle error
                case InvitationResult.InvitationDoesNotExistOrExpired:
                    return NotFound();
            }

            var user = await _userManager.FindByEmailAsync(registrationUserViewModel.Email);
            if(user != null) return Conflict();//TODO handle error user already exists

            user = new ApplicationUser
            {
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                DisplayName = registrationUserViewModel.DisplayName,
                Email = registrationUserViewModel.Email,
                UserName = registrationUserViewModel.Email
            };

            var registerResult = await _userManager.CreateAsync(user, registrationUserViewModel.Password);
            if(!registerResult.Succeeded)
                return StatusCode(500); //TODO handle errors
            return Ok(user);
        }
        #endregion
        #region public methods
        [HttpPost("invite")]
        public async Task<IActionResult> Invite(InvitationRequestViewModel invitationRequestViewModel)
        {
            var inviteResponseModel = await _invitationService.CreateInviteAsync(invitationRequestViewModel.Email);
            await _invitationService.InvitePersonAsync(inviteResponseModel);
            return Ok(inviteResponseModel);
        }
        #endregion
    }
}