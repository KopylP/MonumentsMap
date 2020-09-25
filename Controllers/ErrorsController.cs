using System.Net;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;

namespace MonumentsMap.Controllers
{
    [Route("/errors")]
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        [Route("{code}")]
        public IActionResult Error(int code)
        {
            var parsedCode = (HttpStatusCode) code;
            var error = new ApiError(code, parsedCode.ToString());

            return new ObjectResult(error);
        }
    }
}