namespace MonumentsMap.Application.Dto.Invitation
{
    public enum InvitationResult
    {
        InvitationDoesNotExistOrExpired,
        InvalidInvitationCode,
        Ok,
        UserAlreadyExists
    }
}