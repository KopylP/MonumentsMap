using MonumentsMap.Application.Extensions;
using MonumentsMap.Domain.Enumerations;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Application.Dto.Monuments.LocalizedDto
{
    public class LocalizedParticipantDto : BaseLocalizedDto
    {
        public int Id { get; set; }
        public string DefaultName { get; set; }
        public string Name { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }

        public static LocalizedParticipantDto ToDto(Participant p, string cultureCode)
        {
            return new LocalizedParticipantDto
            {
                Id = p.Id,
                DefaultName = p.DefaultName,
                Name = p.Name.GetNameByCode(cultureCode)
            };
        }
    }
}