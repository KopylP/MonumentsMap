using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Domain.Enumerations;

namespace MonumentsMap.Application.Dto.Monuments.LocalizedDto
{
    public class LocalizedParticipantDto : BaseLocalizedDto
    {
        public int Id { get; set; }
        public string DefaultName { get; set; }
        public string Name { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }
    }
}