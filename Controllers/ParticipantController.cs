using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class ParticipantController : LocalizedController<ParticipantLocalizedRepository, LocalizedParticipant, EditableLocalizedParticipant, Participant>
    {
        #region constructor
        public ParticipantController(ParticipantLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
        #endregion
    }
}