using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Contracts.Repository
{
    public interface IMonumentPhotoLocalizedRepository : ILocalizedRepository<LocalizedMonumentPhoto, EditableLocalizedMonumentPhoto, MonumentPhoto>
    {
         
    }
}