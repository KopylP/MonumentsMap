using System.Collections.Generic;

namespace MonumentsMap.Entities.ViewModels
{
    public class MonumentParticipantsViewModel
    {
        public int MonumentId { get; set; }
        public IEnumerable<ParticipantViewModel> ParticipantViewModels { get; set; }
    }
}