using MonumentsMap.Contracts.Repository;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class ParticipantController : LocalizedController<IParticipantLocalizedRepository, LocalizedParticipant, EditableLocalizedParticipant, Participant>
    {
        #region constructor
        public ParticipantController(IParticipantLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
        #endregion
    }
}