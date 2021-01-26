using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.Invitations;
using MonumentsMap.Contracts.Mail.Commands;
using MonumentsMap.IdentityService.Contracts.Repositories;
using MonumentsMap.IdentityService.Contracts.Services;
using MonumentsMap.IdentityService.Models;
using MonumentsMap.IdentityService.Utilities;
using System;
using System.Threading.Tasks;

namespace MonumentsMap.IdentityService.Consumers.Registration
{
    public class InviteUserConsumer : IConsumer<InviteUserCommand>
    {
        private readonly IMailService _emailService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IInvitationRepository _invitationRepository;
        private readonly string _invitationSecretKey;
        private readonly int _expirationInHours;
        private readonly string _invitationClientUrlPattern;

        public InviteUserConsumer(
            IMailService emailService,
            IConfiguration configuration,
            IInvitationRepository invitationRepository,
            UserManager<ApplicationUser> userManager)
        {
            _emailService = emailService;
            _invitationSecretKey = configuration["Invitation:Key"];
            _expirationInHours = configuration.GetValue<int>("Invitation:ExpirationInHours");
            _invitationClientUrlPattern = configuration["Invitation:InvitationClientUrl"];
            _invitationRepository = invitationRepository;
            _userManager = userManager;
        }

        public async Task Consume(ConsumeContext<InviteUserCommand> context)
        {
            var model = context.Message;
            var result = await CreateInviteAsync(model.Email);

            if (result == null)
                throw new ConflictException("User already exists");

            await InvitePersonAsync(result);

            await context.RespondAsync(result);
        }

        private async Task<InviteUserResult> CreateInviteAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null) return null;
            var now = DateTime.Now;

            var invitations = await _invitationRepository
                .Find(p => p.Email == email && p.ExpireAt > now);

            foreach (var invitation in invitations)
            {
                await _invitationRepository.Delete(invitation.Id);
            }

            var expireAt = now.AddHours(_expirationInHours);
            string salt = Guid.NewGuid().ToString();
            await _invitationRepository.Add(new Invitation
            {
                Email = email,
                ExpireAt = expireAt,
                Salt = salt

            });
            string emailSaltKey = GetEmailWithSaltAndKey(email, salt);
            string invitationCode = HashUtility.ComputeSha256Hash(emailSaltKey);

            await _invitationRepository.SaveChangeAsync();

            return new InviteUserResult
            {
                InvitationCode = invitationCode,
                Email = email,
                ExpireAt = expireAt
            };
        }

        private async Task InvitePersonAsync(InviteUserResult invitation)
        {
            string invitationFullUrl = _invitationClientUrlPattern
                .Replace("{invitation}", invitation.InvitationCode)
                .Replace("{email}", invitation.Email);
            await _emailService.SendEmailAsync(new SendMailCommand
            {
                ToEmail = invitation.Email,
                Subject = "Invitation to Monuments Map Project",
                Body = invitationFullUrl
            });
        }

        private string GetEmailWithSaltAndKey(string email, string salt)
        {
            return email + salt + _invitationSecretKey;
        }
    }
}
