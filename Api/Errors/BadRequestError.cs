using System.Net;

namespace MonumentsMap.Api.Errors
{
    public class BadRequestError : ApiError
    {
        public BadRequestError()
          : base(400, HttpStatusCode.BadRequest.ToString())
        {
        }

        public BadRequestError(string message)
            : base(400, HttpStatusCode.BadRequest.ToString(), message)
        {
        }        
    }
}