using System.Collections.Generic;

namespace MonumentsMap.Application.Dto.Monuments
{
    public class MonumentParticipantsDto
    {
        public int MonumentId { get; set; }
        public IEnumerable<ParticipantDto> Participants { get; set; }
    }
}