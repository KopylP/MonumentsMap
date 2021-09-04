using MonumentsMap.Core.Framework;
using MonumentsMap.Domain.Models;
using MonumentsMap.Domain.Resolvers;

namespace MonumentsMap.Core.Resolvers
{
    public class PhotoUrlResolver : IPhotoUrlResolver
    {
        private readonly IUrlCreator _urlCreator;

        public PhotoUrlResolver(IUrlCreator urlCreator)
        {
            _urlCreator = urlCreator;
        }

        public string GetUrl(Photo photo)
        {
            return GetUrl(photo.Id);
        }

        public string GetUrl(int photoId)
        {
            return _urlCreator.Create("GetImageAsync", "Photo", new { id = photoId });
        }
    }
}
