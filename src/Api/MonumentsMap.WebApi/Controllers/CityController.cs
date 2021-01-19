﻿using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Application.Services.Monuments;

namespace MonumentsMap.Controllers
{
    [ApiVersion("1.0")]
    public class CityController : LocalizedController<ICityService, LocalizedCityDto, EditableLocalizedCityDto>
    {
        public CityController(ICityService localizedRestService) : base(localizedRestService)
        {
        }
    }
}