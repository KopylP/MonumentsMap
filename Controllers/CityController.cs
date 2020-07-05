using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class CityController : LocalizedController<CityLocalizedRepository, LocalizedCity, EditableLocalizedCity, City>
    {
        public CityController(CityLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}
