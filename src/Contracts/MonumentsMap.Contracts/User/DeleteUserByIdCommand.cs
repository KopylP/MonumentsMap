namespace MonumentsMap.Contracts.User
{
    public class DeleteUserByIdCommand : BaseCommand
    {
        public string UserId { get; set; }
    }
}
