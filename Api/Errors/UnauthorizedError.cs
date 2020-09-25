using System.Net;

namespace MonumentsMap.Api.Errors
{
    public class UnauthorizedError : ApiError
    {
         public UnauthorizedError()
          : base(401, HttpStatusCode.Unauthorized.ToString())
        {
        }

        public UnauthorizedError(string message)
            : base(401, HttpStatusCode.Unauthorized.ToString(), message)
        {
        }           
    }
}