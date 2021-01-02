using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;
using MonumentsMap.Domain.Models;
using MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Application.Services.Monuments
{
    public interface IMonumentPhotoService: ILocalizedRestService<LocalizedMonumentPhotoDto, EditableLocalizedMonumentPhotoDto, MonumentPhoto>
    {
        Task<MonumentPhoto> ToogleMajorPhotoAsync(int monumentPhotoId);
        Task<IEnumerable<LocalizedMonumentPhotoDto>> FindAsync(string cultureCode, Expression<Func<MonumentPhoto, bool>> predicate);
    }
}