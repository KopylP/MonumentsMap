using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Image;
using MonumentsMap.Framework.Validators;
using System;

namespace MonumentsMap.WebApi.Framework.ResponseBuilders
{
    class ImageResultBuilder
    {
        public enum ImageFormat
        {
            JPEG,
            PNG
        }

        private ImageResponseDto _imageResponseDto;
        private bool _isBase64 = false;
        private ImageFormat _imageFormat = ImageFormat.JPEG;

        private ImageResultBuilder() {  }

        private ImageResultBuilder(ImageResponseDto dto)
        {
            _imageResponseDto = dto;
        }

        public ImageResultBuilder WithImageFormat(ImageFormat imageFormat)
        {
            _imageFormat = imageFormat;
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
            if (_isBase64)
            {
                return new JsonResult(new { image = $"data:image/{imageFormatString};base64," + Convert.ToBase64String(_imageResponseDto.ImageBytes) });
            }
            else
            {
                return new FileContentResult(_imageResponseDto.ImageBytes, $"image/{imageFormatString}");
            }
        }

        public static ImageResultBuilder Create(ImageResponseDto dto)
        {
            return new ImageResultBuilder(dto);
        }

        private string ConvertImageTypeToString(ImageFormat imageFormat) => imageFormat switch
        {
            ImageFormat.JPEG => "jpeg",
            ImageFormat.PNG => "png",
            _ => throw new NotImplementedException()
        };
    }
}
