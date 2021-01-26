namespace MonumentsMap.Contracts.Auth
{
    public class GetTokenResult
    {
        public string token { get; set; }
        public int expiration { get; set; }
        public string refresh_token { get; set; }
    }
}