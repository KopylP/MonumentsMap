using System.Net;

namespace MonumentsMap.Api.Errors
{
    public class InternalServerError : ApiError
    {
        public InternalServerError() 
            : base(500, HttpStatusCode.InternalServerError.ToString())
        {
        }
        public InternalServerError(string message)
            : base(500, HttpStatusCode.InternalServerError.ToString(), message)
        {
        }
    }
}