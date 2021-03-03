using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Services.Monuments;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace MonumentsMap.WebApi.Controllers.v2
{
    [Route("api/monumentphoto")]
    [ApiVersion("2.0")]
    public class MonumentPhotoV2Controller : MonumentPhotoController
    {
        public MonumentPhotoV2Controller(IMonumentPhotoService localizedRestService, IConfiguration configuration) : base(localizedRestService, configuration)
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
            }
        };
    }
}
