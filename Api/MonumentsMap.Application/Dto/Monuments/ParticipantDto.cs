using MonumentsMap.Domain.Enumerations;

namespace MonumentsMap.Application.Dto.Monuments
{
    public class ParticipantDto
    {
        public int Id { get; set; }
        public string DefaultName { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }
    }
}