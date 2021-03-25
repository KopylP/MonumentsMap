using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Application.Dto.Image;
using MonumentsMap.Framework.Validators;
using System;

namespace MonumentsMap.WebApi.Framework.ResponseBuilders
{
    class ImageResultBuilder
    {
        private ImageResponseDto _imageResponseDto;

        private string _imageType;
        private bool _isBase64 = false;

        private ImageResultBuilder() {  }

        private ImageResultBuilder(ImageResponseDto dto)
        {
            _imageResponseDto = dto;
        }

        public ImageResultBuilder WithStandartImage()
        {
            _imageType = "image/jpeg";
            return this;
        }

        public ImageResultBuilder UseBase64(bool useBase64 = true)
        {
            _isBase64 = useBase64;
            return this;
        }

        public IActionResult Build()
        {
            if (_isBase64)
            {
                return new JsonResult(new { image = "data:image/png;base64," + Convert.ToBase64String(_imageResponseDto.ImageBytes) });
            }
            else
            {
                Guard.NotNullOrEmpty(_imageType);
                return new FileContentResult(_imageResponseDto.ImageBytes, _imageType);
            }
        }

        public static ImageResultBuilder Create(ImageResponseDto dto)
        {
            return new ImageResultBuilder(dto);
        }
    }
}
