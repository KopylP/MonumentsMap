using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Image;
using MonumentsMap.Framework.Converters.Image;
using MonumentsMap.Framework.Validators;
using System;

namespace MonumentsMap.WebApi.Framework.ResponseBuilders
{
    class ImageResultBuilder
    {
        private IImageConverter _imageConverter;
        public enum ImageFormat
        {
            JPEG,
            PNG,
            WEBP
        }

        private ImageResponseDto _imageResponseDto;
        private bool _isBase64 = false;
        private bool _convertToWebP = false;
        private ImageFormat _imageFormat = ImageFormat.JPEG;

        private ImageResultBuilder() {}

        private ImageResultBuilder(ImageResponseDto dto, IImageConverter imageConverter)
        {
            _imageResponseDto = dto;
            _imageConverter = imageConverter;
        }

        public ImageResultBuilder WithImageFormat(ImageFormat imageFormat)
        {
            _imageFormat = imageFormat;
            return this;
        }

        public ImageResultBuilder ConvertToWebP(bool convert = true)
        {
            if (convert)
            {
                if (_imageFormat == ImageFormat.WEBP)
                    throw new ArgumentException("Image is already webp format. Use another format in WithImageFormat method");

                _convertToWebP = true;
            }

            return this;
        }

        public ImageResultBuilder UseBase64(bool useBase64 = true)
        {
            _isBase64 = useBase64;
            return this;
        }

        public IActionResult Build()
        {
            var imageFormatString = ConvertImageTypeToString(_imageFormat);

            var image = _imageResponseDto.ImageBytes;

            if (_convertToWebP)
            {
                image = _imageConverter.ConvertToWebP(image);
            }

            if (_isBase64)
            {
                return new JsonResult(new { image = $"data:image/{imageFormatString};base64," + Convert.ToBase64String(image) });
            }
            else
            {
                return new FileContentResult(image, $"image/{imageFormatString}");
            }
        }

        public static ImageResultBuilder Create(ImageResponseDto dto, IImageConverter imageConverter)
        {
            return new ImageResultBuilder(dto, imageConverter);
        }

        private string ConvertImageTypeToString(ImageFormat imageFormat) => imageFormat switch
        {
            ImageFormat.JPEG => "jpeg",
            ImageFormat.PNG => "png",
            ImageFormat.WEBP => "webp",
            _ => throw new NotImplementedException()
        };
    }
}
