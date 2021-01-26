namespace MonumentsMap.Contracts.User
{
    public class GetUserByIdCommand : BaseCommand
    {
        public string UserId { get; set; }
    }
}
