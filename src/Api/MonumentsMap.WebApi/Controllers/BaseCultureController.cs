using System;
using Microsoft.Extensions.Configuration;

namespace MonumentsMap.WebApi.Controllers
{
    public abstract class BaseCultureController : BaseController
    {
        protected readonly string DefaultCulture;

        public BaseCultureController(IConfiguration configuration)
        {
            DefaultCulture = configuration["DefaultLanguage"];
        }

        protected string SafetyGetCulture(string cultureCode)
        {
            if (string.IsNullOrEmpty(cultureCode)) return DefaultCulture;
            return cultureCode;
        }
    }
}
