using AutoMapper;
using MassTransit;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.Roles;
using MonumentsMap.Contracts.Roles;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MonumentsMap.Core.Services.Roles
{
    class RolesService : IRolesService
    {
        private IRequestClient<GetAllRolesCommand> _getAllRolesRequest;
        private IMapper _mapper;

        public RolesService(IRequestClient<GetAllRolesCommand> getAllRolesRequest, IMapper mapper)
        {
            _getAllRolesRequest = getAllRolesRequest;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RoleResponseDto>> GetAllRolesAsync()
        {
           var response = await _getAllRolesRequest.GetResponse<IEnumerable<RoleResponseDto>>(new GetAllRolesCommand());
           return _mapper.Map<RoleResponseDto[]>(response.Message);
        }
    }
}
