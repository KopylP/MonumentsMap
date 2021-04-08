namespace MonumentsMap.Framework.Converters.Image
{
    public interface IWebPConverter
    {
        byte[] ConvertToWebP(byte[] image);
    }
}