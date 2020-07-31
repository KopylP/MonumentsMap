using System;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;

namespace MonumentsMap.Filters
{
    public class CultureCodeResourceFilter : Attribute, IResourceFilter
    {
        #region private fields
        private readonly string _defaultLanguageCode;
        #endregion
        #region constructor
        public CultureCodeResourceFilter(IConfiguration Configuration) { _defaultLanguageCode = Configuration["DefaultLanguage"]; }
        #endregion
        #region IResourceFilter methods
        public void OnResourceExecuted(ResourceExecutedContext context)
        {
            //without realization
        }

        public void OnResourceExecuting(ResourceExecutingContext context)
        {
            if (!context.HttpContext.Request.Query.ContainsKey("cultureCode") || context.HttpContext.Request.Query["cultureCode"] == string.Empty)
            {
                var queryParams = HttpUtility
                    .ParseQueryString(context.HttpContext.Request.QueryString.ToString())
                    .ToDictionary();
                queryParams.Add("cultureCode", _defaultLanguageCode);
                var url = QueryHelpers.AddQueryString(context.HttpContext.Request.Path.ToString(), queryParams);
                context.Result = new RedirectResult(url);
            }
        }
        #endregion
    }
}