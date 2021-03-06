using System;

namespace MonumentsMap.Contracts.Exceptions
{
    public class ProhibitException : ApiException
    {
        public ProhibitException()
        {
        }

        public ProhibitException(string message) : base(message)
        {
        }

        public ProhibitException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}