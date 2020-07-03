using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    public class StatusController : LocalizedController<StatusLocalizedRepository, LocalizedStatus, EditableLocalizedStatus, Status>
    {
        public StatusController(StatusLocalizedRepository localizedRepository) : base(localizedRepository)
        {
        }
    }
}