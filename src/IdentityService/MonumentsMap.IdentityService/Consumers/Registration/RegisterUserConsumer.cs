using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.Invitation;
using MonumentsMap.Contracts.User;
using MonumentsMap.IdentityService.Contracts.Repositories;
using MonumentsMap.IdentityService.Models;
using MonumentsMap.IdentityService.Utilities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.Registration
{
    public class RegisterUserConsumer : IConsumer<RegisterUserCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IInvitationRepository _invitationRepository;
        private readonly string _invitationSecretKey;

        public RegisterUserConsumer(
            IConfiguration configuration,
            IInvitationRepository invitationRepository,
            UserManager<ApplicationUser> userManager)
        {
            _invitationSecretKey = configuration["Invitation:Key"];
            _invitationRepository = invitationRepository;
            _userManager = userManager;
        }

        public async Task Consume(ConsumeContext<RegisterUserCommand> context)
        {
            var model = context.Message;
            var result = await CheckInvitationCodeAsync(model.Email, model.InviteCode);
            switch (result)
            {
                case InvitationResult.InvalidInvitationCode:
                    throw new ApiException("Invitation code is incorrect");
                case InvitationResult.InvitationDoesNotExistOrExpired:
                    throw new NotFoundException("Invitation code doesn`t exist or already expired");
                case InvitationResult.UserAlreadyExists:
                    throw new ConflictException("User already exists");
            }

            var user = new ApplicationUser
            {
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                DisplayName = model.DisplayName,
                Email = model.Email,
                UserName = model.Email
            };

            var registerResult = await _userManager.CreateAsync(user, model.Password);
            if (!registerResult.Succeeded)
                throw new InternalServerErrorException();

            await context.RespondAsync(new UserResult
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt,
                DisplayName = user.DisplayName
            });
        }

        private async Task<InvitationResult> CheckInvitationCodeAsync(string email, string invitationCode)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null) return InvitationResult.UserAlreadyExists;
            var now = DateTime.Now;
            var invitations = await _invitationRepository
                .Find(p => p.Email == email && p.ExpireAt > now);

            if (!invitations.Any()) return InvitationResult.InvitationDoesNotExistOrExpired;
            var invitation = invitations.FirstOrDefault();
            var originalInvitationCode = HashUtility.ComputeSha256Hash(GetEmailWithSaltAndKey(invitation.Email, invitation.Salt));
            return originalInvitationCode == invitationCode ? InvitationResult.Ok : InvitationResult.InvalidInvitationCode;
        }

        private string GetEmailWithSaltAndKey(string email, string salt)
        {
            return email + salt + _invitationSecretKey;
        }
    }
}
