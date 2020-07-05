using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentController : LocalizedController<MonumentLocalizedRepository, LocalizedMonument, EditableLocalizedMonument, Monument>
    {
        public MonumentController(MonumentLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}