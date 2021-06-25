using System;
using AutoMapper;
using MonumentsMap.Application.Dto.Monuments;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Resolvers;

namespace MonumentsMap.Core.Profiles.Converters
{
    public class MonumentPhotoConverter : ITypeConverter<MonumentPhoto, MonumentPhotoDto>
    {
        private readonly IPhotoUrlResolver _photoUrlResolver;

        public MonumentPhotoConverter(IPhotoUrlResolver photoUrlResolver)
        {
            _photoUrlResolver = photoUrlResolver;
        }

        public MonumentPhotoDto Convert(MonumentPhoto source, MonumentPhotoDto destination, ResolutionContext context)
        {
            return new MonumentPhotoDto
            {
                Id = source.Id,
                MajorPhoto = source.MajorPhoto,
                PhotoId = source.PhotoId,
                Url = _photoUrlResolver.GetUrl(source.PhotoId)
            };
        }
    }
}
