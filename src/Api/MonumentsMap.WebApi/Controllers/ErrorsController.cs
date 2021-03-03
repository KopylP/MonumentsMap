using System.Net;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.WebApi.Controllers;

namespace MonumentsMap.Controllers
{
    [Route("/errors")]
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    public class ErrorsController : BaseController
    {
        [HttpGet("{code}")]
        public IActionResult Error(int code)
        {
            var parsedCode = (HttpStatusCode) code;
            var error = new ApiError(code, parsedCode.ToString());

            return new ObjectResult(error);
        }
    }
}