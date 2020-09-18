using MonumentsMap.Contracts.Repository;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class ConditionController : LocalizedController<IConditionLocalizedRepository, LocalizedCondition, EditableLocalizedCondition, Condition>
    {
        public ConditionController(IConditionLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}