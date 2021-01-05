using System.Net;

namespace MonumentsMap.Api.Errors
{
    public class ConflictError : ApiError
    {
        public ConflictError()
            : base(409, HttpStatusCode.Conflict.ToString())
        {
        }

        public ConflictError(string message)
            : base(409, HttpStatusCode.Conflict.ToString(), message)
        {
        }
    }
}