using MonumentsMap.Contracts.Repository;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class StatusController : LocalizedController<IStatusLocalizedRepository, LocalizedStatus, EditableLocalizedStatus, Status>
    {
        public StatusController(IStatusLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}