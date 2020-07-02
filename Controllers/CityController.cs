using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MonumentsMap.Data.Repositories;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        private readonly CityLocalizedRepository cityLocalizedRepository;
        public CityController(CityLocalizedRepository cityLocalizedRepository)
            => this.cityLocalizedRepository = cityLocalizedRepository;
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string cultureCode = "uk-UA") 
        {
            var cities = await cityLocalizedRepository.GetAll(cultureCode);
            return Ok(cities);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EditableLocalizedCity editableLocalizedCity)
        {
            City city = await cityLocalizedRepository.Create(editableLocalizedCity);
            return Ok(city);
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditableLocalizedCity editableLocalizedCity)
        {
            City city = await cityLocalizedRepository.Update(editableLocalizedCity);
            return Ok(city);
        }
    }
}
