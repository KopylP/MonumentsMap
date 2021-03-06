﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Services.Monuments;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
using MonumentsMap.Application.Services.Filter;

namespace MonumentsMap.WebApi.Controllers.v2
{
    [Route("api/monument")]
    [ApiVersion("2.0")]
    public class MonumentV2Controller : MonumentController
    {
        public MonumentV2Controller(IMonumentService localizedRestService,
            IMonumentPhotoService monumentPhotoService,
            IConfiguration configuration, IFilterService filterService) : base(localizedRestService, monumentPhotoService, configuration, filterService)
        {
        }

        protected override JsonSerializerSettings JsonSerializerSettings => new JsonSerializerSettings
        {
            Converters = new List<JsonConverter>
            {
                new Newtonsoft.Json.Converters.StringEnumConverter()
            },
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            },
            NullValueHandling = NullValueHandling.Ignore
        };
    }
}
