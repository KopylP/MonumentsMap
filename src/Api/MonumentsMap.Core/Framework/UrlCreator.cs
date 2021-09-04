using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;

namespace MonumentsMap.Core.Framework
{
    public class UrlCreator : IUrlCreator
    {
        private readonly IUrlHelper _urlHelper;

        public UrlCreator(IActionContextAccessor actionContextAccessor, IUrlHelperFactory urlHelperFactory)
        {
            _urlHelper = urlHelperFactory.GetUrlHelper(actionContextAccessor.ActionContext);
        }

        public string Create(string action, string controller, object values)
        {
            string scheme = _urlHelper.ActionContext.HttpContext.Request.Scheme;
            return _urlHelper.Action(action, controller, values, scheme);
        }
    }
}
