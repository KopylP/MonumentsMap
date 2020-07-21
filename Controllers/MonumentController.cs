using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class MonumentController : LocalizedController<MonumentLocalizedRepository, LocalizedMonument, EditableLocalizedMonument, Monument>
    {
        #region private fields
        private readonly MonumentPhotoLocalizedRepository _monumentPhotoLocalizedRepository;
        #endregion
        #region constructor
        public MonumentController(MonumentLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
        #endregion

        // #region metods
        // #endregion

    }
}