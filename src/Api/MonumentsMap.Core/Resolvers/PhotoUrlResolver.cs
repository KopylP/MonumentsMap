using System;
using Microsoft.Extensions.Configuration;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Resolvers;

namespace MonumentsMap.Core.Resolvers
{
    public class PhotoUrlResolver : IPhotoUrlResolver
    {
        private readonly string basePhotoUrl;

        public PhotoUrlResolver(IConfiguration configuration)
        {
            basePhotoUrl = configuration["BasePhotoUrl"];
        }

        public string GetUrl(Photo photo)
        {
            return string.Format(basePhotoUrl, photo.Id);
        }

        public string GetUrl(int photoId)
        {
            return string.Format(basePhotoUrl, photoId);
        }
    }
}
