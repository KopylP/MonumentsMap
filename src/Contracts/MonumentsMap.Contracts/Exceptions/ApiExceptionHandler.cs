using MassTransit;
using System.Linq;
namespace MonumentsMap.Contracts.Exceptions
{
    public static class ApiExceptionHandler
    {
        public static void HandleRequestFaultException(RequestFaultException ex)
        {
            if (ex.Fault.Exceptions.Length == 0)
                throw ex;

            foreach (var exception in ex.Fault.Exceptions)
            {
                switch (exception.ExceptionType.Split(".").Last())
                {
                    case nameof(BadRequestException): throw new BadRequestException(exception.Message);
                    case nameof(ConflictException): throw new ConflictException(exception.Message);
                    case nameof(InternalServerErrorException): throw new InternalServerErrorException(exception.Message);
                    case nameof(NotFoundException): throw new NotFoundException(exception.Message);
                    case nameof(ProhibitException): throw new ProhibitException(exception.Message);
                    case nameof(UnauthorizedException): throw new UnauthorizedException(exception.Message);
                    case nameof(ApiException): throw new ApiException(exception.Message);
                    default: throw ex;
                }
            }
        }
    }
}