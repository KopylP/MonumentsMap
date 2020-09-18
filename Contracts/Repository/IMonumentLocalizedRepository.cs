using MonumentsMap.Entities.FilterParameters;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Contracts.Repository
{
    public interface IMonumentLocalizedRepository 
        : ILocalizedRepository<LocalizedMonument, EditableLocalizedMonument, Monument>,
        IFilterRepository<LocalizedMonument, MonumentFilterParameters>
    {
         
    }
}