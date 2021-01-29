using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Contracts.Paging;
using Newtonsoft.Json;

namespace MonumentsMap.WebApi.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        protected IActionResult PagingList<T>(PagingList<T> pagingList)
        {
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(pagingList.PagingInformation));
            return Ok(pagingList.Items);
        }
    }
}
