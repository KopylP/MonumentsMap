using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonumentsMap.Data;
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
