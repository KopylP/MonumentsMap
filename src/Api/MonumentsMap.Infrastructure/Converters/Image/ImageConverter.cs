using MonumentsMap.Framework.Converters.Image;
using SkiaSharp;

namespace MonumentsMap.Infrastructure.Converters.Image
{
    class ImageConverter : IImageConverter
    {
        public byte[] ConvertToWebP(byte[] image)
        {
            var data = SKBitmap.Decode(image).Encode(SKEncodedImageFormat.Webp, 65);

            return data.ToArray();
        }
    }
}
