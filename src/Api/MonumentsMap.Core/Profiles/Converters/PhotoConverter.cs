using System;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Core.Resolvers;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Resolvers;

namespace MonumentsMap.Core.Profiles.Converters
{
    public class PhotoConverter : ITypeConverter<Photo, PhotoDto>
    {
        private readonly IPhotoUrlResolver _photoUrlResolver;

        public PhotoConverter(IPhotoUrlResolver photoUrlResolver)
        {
            _photoUrlResolver = photoUrlResolver;
        }

        public PhotoDto Convert(Photo source, PhotoDto destination, ResolutionContext context)
        {
            return new PhotoDto
            {
                ImageScale = source.ImageScale,
                FileName = source.FileName,
                Id = source.Id,
                Url = _photoUrlResolver.GetUrl(photo: source)
            };
        }
    }
}
