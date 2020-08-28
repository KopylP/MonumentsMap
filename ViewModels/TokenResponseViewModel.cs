namespace MonumentsMap.ViewModels
{
    public class TokenResponseViewModel
    {
        #region props
        public string token { get; set; }
        public int expiration { get; set; }
        public string refresh_token { get; set; }
        #endregion
    }
}