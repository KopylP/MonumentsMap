using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class ConditionController : LocalizedController<ConditionLocalizedRepository, LocalizedCondition, EditableLocalizedCondition, Condition>
    {
        public ConditionController(ConditionLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}