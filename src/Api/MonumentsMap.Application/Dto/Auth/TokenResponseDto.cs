namespace MonumentsMap.Application.Dto.Auth
{
    public class TokenResponseDto
    {
        public string token { get; set; }
        public int expiration { get; set; }
        public string refresh_token { get; set; }
    }
}