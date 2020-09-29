using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MonumentsMap.Api.Exceptions;
using MonumentsMap.Contracts.Repository;
using MonumentsMap.Contracts.Services;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels;

namespace MonumentsMap.Data.Services
{
    public class MonumentService : IMonumentService
    {
        #region  private fields
        private readonly IMonumentRepository _monumentRepository;
        private readonly IParticipantMonumentRepository _participantMonumentRepository;
        private readonly IMonumentLocalizedRepository _monumentLocalizedRepository;
        #endregion

        #region constructor
        public MonumentService(
            IMonumentRepository repo,
            IParticipantMonumentRepository participantMonumentRepository,
            IMonumentLocalizedRepository monumentLocalizedRepository)
        {
            _monumentRepository = repo;
            _participantMonumentRepository = participantMonumentRepository;
            _monumentLocalizedRepository = monumentLocalizedRepository;
        }
        #endregion

        #region interface methods
        public async Task<Monument> ToogleMajorPhotoAsync(int monumentId)
        {
            var monument = await _monumentRepository.Get(monumentId);
            if (monument == null)
            {
                throw new NotFoundException("Monument not found");
            }
            monument.Accepted = !monument.Accepted;
            try
            {
                await _monumentRepository.Update(monument);
            }
            catch (DbUpdateException ex)
            {
                throw new InternalServerErrorException(ex.InnerException?.Message);
            }
            return monument;
        }

        public async Task<Monument> EditMonumentParticipantsAsync(MonumentParticipantsViewModel monumentParticipantsViewModel)
        {
            var monument = await _monumentRepository.Get(monumentParticipantsViewModel.MonumentId);
            if (monument == null)
            {
                throw new NotFoundException("Monument not found");
            }
            var oldParticipantMonuments = await _participantMonumentRepository
                .Find(p => p.MonumentId == monumentParticipantsViewModel.MonumentId);

            _participantMonumentRepository.Commit = false;

            List<ParticipantViewModel> sameParticipants = new List<ParticipantViewModel>();

            // DELETE old participant monuments
            if (oldParticipantMonuments.Any())
            {
                foreach (var oldParticipantMonument in oldParticipantMonuments)
                {
                    var sameParticipant = monumentParticipantsViewModel
                        .ParticipantViewModels.Where(p => p.Id == oldParticipantMonument.ParticipantId)
                        .FirstOrDefault();

                    if (sameParticipant == null)
                    {
                        await _participantMonumentRepository.Delete(oldParticipantMonument.Id);
                    }
                    else
                    {
                        sameParticipants.Add(sameParticipant);
                    }
                }
            }

            // Insert new Partisipant monuments
            foreach (var participant in monumentParticipantsViewModel.ParticipantViewModels)
            {
                if (!sameParticipants.Where(p => p.Id == participant.Id).Any())
                {
                    await _participantMonumentRepository.Add(new ParticipantMonument
                    {
                        MonumentId = monument.Id,
                        ParticipantId = participant.Id
                    });
                }
            }

            // Save changes
            try
            {
                await _participantMonumentRepository.SaveChangeAsync();
            }
            catch (DbUpdateException ex)
            {
                throw new InternalServerErrorException(ex.InnerException?.Message);
            }
            finally
            {
                _participantMonumentRepository.Commit = true;
            }

            return monument;
        }

        public async Task<IEnumerable<Participant>> GetRawParticipantsAsync(int monumentId)
        {

            var monument = _monumentRepository.Get(monumentId);

            if (monument == null)
            {
                throw new NotFoundException("Monument not found");
            }

            var participantMonuments = await _participantMonumentRepository
                .Find(p => p.MonumentId == monumentId, "Participant");

            return participantMonuments.Select(p => p.Participant);
        }

        public async Task<IEnumerable<LocalizedParticipant>> GetLocalizedParticipants(int monumentId, string cultureCode)
        {
            var participants = await _participantMonumentRepository
                .GetParticipantsByMonumentWithLocalizationsAsync(monumentId);

            return participants.Select(p => new LocalizedParticipant
            {
                Id = p.Id,
                DefaultName = p.DefaultName,
                Name = p.Name.Localizations.Where(p => p.CultureCode == cultureCode).FirstOrDefault()?.Value
            })
            .ToList();
        }

        public async Task<LocalizedMonument> GetMonumentBySlug(string slug, string cultureCode)
        {
            
            LocalizedMonument monument = await _monumentLocalizedRepository.GetEntityBySlugAsync(slug, cultureCode);
            if(monument == null)
            {
                throw new NotFoundException("Monument by slug not found");
            }
            return monument;
        }
        #endregion
    }
}