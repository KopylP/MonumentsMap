using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Exceptions;
using MonumentsMap.Application.Services.Monuments;
using MonumentsMap.Core.Extensions;
using MonumentsMap.Domain.FilterParameters;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Repository;

namespace MonumentsMap.Data.Services
{
    public class MonumentService : IMonumentService
    {
        private string slugLanguage;
        private IMonumentRepository _monumentRepository;
        private IParticipantMonumentRepository _participantMonumentRepository;
        public MonumentService(
            IConfiguration configuration,
            IMonumentRepository monumentRepository,
            IParticipantMonumentRepository participantMonumentRepository)
        {
            slugLanguage = configuration["SlugLanguage"];
            _monumentRepository = monumentRepository;
            _participantMonumentRepository = participantMonumentRepository;
        }

        public async Task<Monument> ToogleMonument(int monumentId)
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

            await _monumentRepository.SaveChangeAsync();

            return monument;
        }

        public async Task<Monument> EditMonumentParticipantsAsync(MonumentParticipantsDto monumentParticipantsViewModel)
        {
            var monument = await _monumentRepository.Get(monumentParticipantsViewModel.MonumentId);
            if (monument == null)
            {
                throw new NotFoundException("Monument not found");
            }
            var oldParticipantMonuments = await _participantMonumentRepository
                .Find(p => p.MonumentId == monumentParticipantsViewModel.MonumentId);

            List<ParticipantDto> sameParticipants = new List<ParticipantDto>();

            // DELETE old participant monuments
            if (oldParticipantMonuments.Any())
            {
                foreach (var oldParticipantMonument in oldParticipantMonuments)
                {
                    var sameParticipant = monumentParticipantsViewModel
                        .Participants.Where(p => p.Id == oldParticipantMonument.ParticipantId)
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
            foreach (var participant in monumentParticipantsViewModel.Participants)
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

            return monument;
        }

        public async Task<IEnumerable<Participant>> GetRawParticipantsAsync(int monumentId)
        {
            var monument = await _monumentRepository.Get(monumentId);

            if (monument == null)
            {
                throw new NotFoundException("Monument not found");
            }

            var participantMonuments = await _participantMonumentRepository
                .Find(p => p.MonumentId == monumentId, x => x.Participant);

            return participantMonuments.Select(p => p.Participant);
        }

        public async Task<IEnumerable<LocalizedParticipantDto>> GetLocalizedParticipants(int monumentId, string cultureCode)
        {
            var participants = await _participantMonumentRepository
                .GetParticipantsByMonumentWithLocalizationsAsync(monumentId);

            return participants.Select(p => new LocalizedParticipantDto
            {
                Id = p.Id,
                DefaultName = p.DefaultName,
                Name = p.Name.Localizations.Where(p => p.CultureCode == cultureCode).FirstOrDefault()?.Value
            })
            .ToList();
        }

        public async Task<LocalizedMonumentDto> GetMonumentBySlug(string slug, string cultureCode)
        {
            var monument = (await _monumentRepository.Find(p => p.Slug == slug,
                m => m.Status.Description.Localizations,
                m => m.Status.Name.Localizations,
                m => m.Condition.Description.Localizations,
                m => m.Condition.Name.Localizations,
                m => m.Sources,
                m => m.MonumentPhotos,
                m => m.Name.Localizations,
                m => m.Description.Localizations,
                m => m.City.Name.Localizations))
                .FirstOrDefault();

            if (monument == null)
            {
                throw new NotFoundException("Monument by slug not found");
            }
            return LocalizedMonumentDto.ToDto(monument, cultureCode);
        }

        public async Task<Monument> GetMonumentBySlug(string slug)
        {
            var monument = await GetMonumentBySlugOrNull(slug);
            if (monument == null)
            {
                throw new NotFoundException("Monument by slug not found");
            }
            return monument;
        }

        private async Task<Monument> GetMonumentBySlugOrNull(string slug)
        {

            return (await _monumentRepository.Find(p => p.Slug == slug))
                    .FirstOrDefault();

        }
        public async Task<IEnumerable<LocalizedMonumentDto>> GetAsync(string cultureCode)
        {
            var monuments = await _monumentRepository.GetAll(
                m => m.Condition.Description,
                m => m.Condition.Name,
                m => m.Name.Localizations,
                m => m.Description.Localizations,
                m => m.MonumentPhotos);

            return monuments.Select(p => LocalizedMonumentDto.ToDto(p, cultureCode));
        }

        public async Task<LocalizedMonumentDto> GetAsync(int id, string cultureCode)
        {
            var monument = await _monumentRepository.Get(id,
                m => m.Status.Description.Localizations,
                m => m.Status.Name.Localizations,
                m => m.Condition.Description.Localizations,
                m => m.Condition.Name.Localizations,
                m => m.Sources,
                m => m.MonumentPhotos,
                m => m.Name.Localizations,
                m => m.Description.Localizations,
                m => m.City.Name.Localizations);

            if (monument == null)
            {
                throw new NotFoundException("Monument by id not found");
            }
            return LocalizedMonumentDto.ToDto(monument, cultureCode);
        }

        public async Task<EditableLocalizedMonumentDto> GetEditable(int id)
        {
            var entity = await _monumentRepository.Get(id,
                m => m.Sources,
                m => m.Name.Localizations,
                m => m.Description.Localizations);

            if (entity == null)
            {
                throw new NotFoundException("Monument by id not found");
            }

            return EditableLocalizedMonumentDto.FromEntity(entity);
        }

        public async Task<Monument> EditAsync(EditableLocalizedMonumentDto model)
        {
            var monument = await _monumentRepository.Get(model.Id,
                p => p.Sources,
                p => p.Name.Localizations,
                p => p.Description.Localizations);

            var entity = model.CreateEntity(monument);

            ChangeSlugOfMonument(entity);

            await _monumentRepository.Update(entity);
            await _monumentRepository.SaveChangeAsync();

            return entity;
        }

        public async Task<Monument> CreateAsync(EditableLocalizedMonumentDto model)
        {
            var entity = model.CreateEntity();
            await _monumentRepository.Add(entity);
            ChangeSlugOfMonument(entity);
            await _monumentRepository.SaveChangeAsync();

            return entity;
        }

        public async Task<IEnumerable<LocalizedMonumentDto>> GetByFilterAsync(MonumentFilterParameters parameters)
        {
            var monuments = await _monumentRepository.GetByFilterAsync(parameters);
            return await Task.FromResult(monuments.Select(p => LocalizedMonumentDto.ToDto(p, parameters.CultureCode)));
        }

        public async Task<int> RemoveAsync(int id)
        {

            await _monumentRepository.Delete(id);
            await _monumentRepository.SaveChangeAsync();
            return id;
        }

        public async Task<IEnumerable<LocalizedMonumentDto>> GetAccepted(string cultureCode)
        {
            var monuments = await _monumentRepository.Find(
                p => p.Accepted,
                m => m.Condition.Description,
                m => m.Condition.Name,
                m => m.Name.Localizations,
                m => m.Description.Localizations,
                m => m.MonumentPhotos);

            return monuments.Select(p => LocalizedMonumentDto.ToDto(p, cultureCode));
        }

        private void ChangeSlugOfMonument(Monument entity)
        {
            var slugName = entity.Name
                .Localizations
                .Where(p => p.CultureCode == slugLanguage)
                .FirstOrDefault()
                .Value
                .Slugify();

            Monument monument = GetMonumentBySlugOrNull(slugName).Result;


            if (monument != null && monument.Id != entity.Id)
            {
                slugName += $"-{entity.Year}";
            }
            entity.Slug = slugName;
        }
    }
}