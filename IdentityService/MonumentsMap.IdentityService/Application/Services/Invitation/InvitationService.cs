using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Dto.Invitation;
using MonumentsMap.Application.Dto.Mail;
using MonumentsMap.Application.Services.Invitation;
using MonumentsMap.Contracts.Invitation;
using MonumentsMap.Contracts.Invitations;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;
using MonumentsMap.IdentityService.Contracts.Services.Mail;
using MonumentsMap.IdentityService.Utilities;

namespace MonumentsMap.Data.Services
{
    public class InvitationService : IInvitationService
    {
        private readonly IMailService _emailService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IInvitationRepository _invitationRepository;
        private readonly string _invitationSecretKey;
        private readonly int _expirationInHours;
        private readonly string _invitationClientUrlPattern;

        public InvitationService(
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

        public async Task<InvitationContract> CreateInviteAsync(string email)
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

            return new InvitationContract
            {
                InvitationCode = invitationCode,
                Email = email,
                ExpireAt = expireAt
            };
        }

        public async Task InvitePersonAsync(InvitationContract invitation)
        {
            string invitationFullUrl = _invitationClientUrlPattern
                .Replace("{invitation}", invitation.InvitationCode)
                .Replace("{email}", invitation.Email);
            await _emailService.SendEmailAsync(new MailRequestDto
            {
                ToEmail = invitation.Email,
                Subject = "Invitation to Monuments Map Project",
                Body = invitationFullUrl
            });
        }

        public async Task<InvitationResult> CheckInvitationCodeAsync(string email, string invitationCode)
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