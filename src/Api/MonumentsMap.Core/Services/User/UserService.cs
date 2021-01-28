using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MassTransit;
using Microsoft.Extensions.Logging;
using MonumentsMap.Application.Dto.User;
using MonumentsMap.Application.Services.User;
using MonumentsMap.Contracts.Exceptions;
using MonumentsMap.Contracts.User;

namespace MonumentsMap.Data.Services
{
    public class UserService : IUserService
    {
        private IRequestClient<GetUsersCommand> _getUsersRequest;
        private IRequestClient<ChangeUserRolesCommand> _changeUserRolesRequest;
        private IRequestClient<DeleteUserByIdCommand> _deleteUserByIdRequest;
        private IRequestClient<RemoveUserFromRolesCommand> _removeUserFromRolesRequest;
        private IRequestClient<GetUserByIdCommand> _getUserbyIdRequest;
        private IRequestClient<GetUserRolesCommand> _getUserRolesRequest;
        private IMapper _mapper;
        private ILogger _logger;

        public UserService(
            IMapper mapper,
            IRequestClient<GetUsersCommand> requestGetUsers,
            IRequestClient<ChangeUserRolesCommand> changeUserRolesRequest,
            IRequestClient<DeleteUserByIdCommand> deleteUserByIdRequest,
            IRequestClient<RemoveUserFromRolesCommand> removeUserFromRolesRequest,
            IRequestClient<GetUserRolesCommand> getUserRolesRequest,
            IRequestClient<GetUserByIdCommand> getUserByIdRequest,
            ILogger logger)
        {
            _mapper = mapper;
            _getUsersRequest = requestGetUsers;
            _changeUserRolesRequest = changeUserRolesRequest;
            _deleteUserByIdRequest = deleteUserByIdRequest;
            _removeUserFromRolesRequest = removeUserFromRolesRequest;
            _getUserRolesRequest = getUserRolesRequest;
            _getUserbyIdRequest = getUserByIdRequest;
            _logger = logger;
        }

        public async Task<UserResponseDto> ChangeUserRolesAsync(string userId, UserRoleRequestDto userRoleViewModel)
        {
            try
            {
                var request = new ChangeUserRolesCommand
                {
                    UserId = userId,
                    RoleNames = userRoleViewModel.RoleNames.ToArray()
                };

                _logger.LogInformation(string.Join(" ", request.RoleNames));

                var response = await _changeUserRolesRequest.GetResponse<UserResult>(request);
                return _mapper.Map<UserResponseDto>(response.Message);
            }
            catch (RequestFaultException ex)
            {
                ApiExceptionHandler.HandleRequestFaultException(ex);
                return null;
            }
        }

        public async Task<UserResponseDto> DeleteUserAsync(string userId)
        {
            try
            {
                var request = new DeleteUserByIdCommand
                {
                    UserId = userId
                };

                var response = await _deleteUserByIdRequest.GetResponse<UserResult>(request);
                return _mapper.Map<UserResponseDto>(response.Message);
            }
            catch (RequestFaultException ex)
            {
                ApiExceptionHandler.HandleRequestFaultException(ex);
                return null;
            }
        }

        public async Task<UserResponseDto> GetUserByIdAsync(string userId)
        {

            var request = new GetUserByIdCommand
            {
                UserId = userId
            };

            Response<UserResult> response = null;

            try
            {
                response = await _getUserbyIdRequest.GetResponse<UserResult>(request);
            }
            catch (RequestFaultException ex)
            {
                ApiExceptionHandler.HandleRequestFaultException(ex);
            }
        
            return _mapper.Map<UserResponseDto>(response.Message);
        }

        public async Task<IEnumerable<RoleResponseDto>> GetUserRolesAsync(string userId)
        {
            try
            {
                var request = new GetUserRolesCommand
                {
                    UserId = userId
                };

                var response = await _getUserRolesRequest.GetResponse<RoleResult[]>(request);
                return _mapper.Map<RoleResponseDto[]>(response.Message);
            }
            catch (RequestFaultException ex)
            {
                ApiExceptionHandler.HandleRequestFaultException(ex);
                return null;
            }
        }

        public async Task<IEnumerable<UserResponseDto>> GetUsersAsync()
        {
            var request = new GetUsersCommand { };
            var response = await _getUsersRequest.GetResponse<UserResult[]>(request);
            return _mapper.Map<UserResponseDto[]>(response.Message).AsEnumerable();
        }

        public async Task<UserResponseDto> RemoveUserFromRolesAsync(string userId, UserRoleRequestDto userRoleViewModel)
        {
            try
            {
                var request = new RemoveUserFromRolesCommand
                {
                    UserId = userId,
                    RoleNames = userRoleViewModel.RoleNames.ToArray()
                };

                var response = await _removeUserFromRolesRequest.GetResponse<UserResult>(request);
                return _mapper.Map<UserResponseDto>(response.Message);
            }
            catch (RequestFaultException ex)
            {
                ApiExceptionHandler.HandleRequestFaultException(ex);
                return null;
            }
        }
    }
}