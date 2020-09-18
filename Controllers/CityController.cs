using MonumentsMap.Contracts.Repository;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class CityController : LocalizedController<ICityLocalizedRepository, LocalizedCity, EditableLocalizedCity, City>
    {
        public CityController(ICityLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}
