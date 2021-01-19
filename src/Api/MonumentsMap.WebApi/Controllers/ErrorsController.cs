using System.Net;
using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;

namespace MonumentsMap.Controllers
{
    [Route("/errors")]
    [ApiController]
    [ApiVersion("1.0")]
    public class ErrorsController : ControllerBase
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