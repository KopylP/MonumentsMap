namespace MonumentsMap.Contracts.Invitation
{
    public enum InvitationResult
    {
        InvitationDoesNotExistOrExpired,
        InvalidInvitationCode,
        Ok,
        UserAlreadyExists
    }
}