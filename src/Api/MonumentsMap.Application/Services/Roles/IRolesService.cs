using MonumentsMap.Application.Dto.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Application.Services.Roles
{
    public interface IRolesService
    {
        Task<IEnumerable<RoleResponseDto>> GetAllRolesAsync();
    }
}
