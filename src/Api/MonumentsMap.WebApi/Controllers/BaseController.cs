using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Api.Errors;
using MonumentsMap.Contracts.Paging;
using Newtonsoft.Json;

namespace MonumentsMap.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult PagingList<T>(PagingList<T> pagingList)
        {
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(pagingList.PagingInformation));
            return Ok(pagingList.Items);
        }

        protected IActionResult ApiErrorResponse(int statusCode, string message = null)
        {
            return StatusCode(statusCode, new ApiError(statusCode, message));
        }

        protected IActionResult BadRequestResponse(string message = null)
        {
            return BadRequest(new BadRequestError(message));
        }

        protected IActionResult ConflictResponse(string message = null)
        {
            return Conflict(new ConflictError(message));
        }

        protected IActionResult ForbidResponse(string message = null)
        {
            return StatusCode(403, new ForbidError(message));
        }

        protected IActionResult InternalServerErrorResponse(string message = null)
        {
            return StatusCode(500, new InternalServerError(message));
        }

        protected IActionResult NotFoundResponse(string message = null)
        {
            return NotFound(new NotFoundError(message));
        }

        protected IActionResult UnauthorizedResponse(string message = null)
        {
            return Unauthorized(new UnauthorizedError(message));
        }
    }
}
