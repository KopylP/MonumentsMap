using System.Net;

namespace MonumentsMap.Api.Errors
{
    public class ForbidError : ApiError
    {
        public ForbidError()
            : base(403, HttpStatusCode.Unauthorized.ToString())
        {
        }

        public ForbidError(string message)
            : base(403, HttpStatusCode.Unauthorized.ToString(), message)
        {
        }
    }
}