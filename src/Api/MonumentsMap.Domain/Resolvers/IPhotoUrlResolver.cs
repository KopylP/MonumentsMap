using System;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Domain.Resolvers
{
    public interface IPhotoUrlResolver
    {
        string GetUrl(Photo photo);
        string GetUrl(int photoId);
    }
}
