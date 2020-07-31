using System.IO;
using SkiaSharp;

namespace MonumentsMap.Utilities
{
    public static class ImageUtility
    {
        public static Stream GetIamgeThumbnail(FileStream stream, int resizeWidth)
        {
            using (var imageStream = new SKManagedStream(stream))
            {
                int width, height;
                using (var original = SKBitmap.Decode(imageStream))
                {
                    if (original.Width > original.Height)
                    {
                        width = resizeWidth;
                        height = original.Height * resizeWidth / original.Width;
                    }
                    else
                    {
                        width = original.Width * resizeWidth / original.Height;
                        height = resizeWidth;
                    }

                    using (var resized = original.Resize(new SKImageInfo(width, height), SKFilterQuality.High))
                    {
                        if (resized == null) return null;

                        using (var image = SKImage.FromBitmap(resized))
                        {
                            return image.Encode(SKEncodedImageFormat.Jpeg, 60).AsStream();
                        }
                    }
                }
            }
        }
    }
}