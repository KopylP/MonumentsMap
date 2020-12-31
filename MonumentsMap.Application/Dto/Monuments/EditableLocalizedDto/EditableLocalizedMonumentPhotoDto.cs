using System.Collections.Generic;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Domain.Enumerations;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedMonumentPhotoDto : BaseEditableLocalizedDto<MonumentPhoto>
    {
        public int? Year { get; set; }
        public Period? Period { get; set; }
        public int MonumentId { get; set; }
        public int PhotoId { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public List<Source> Sources { get; set; }
        public override MonumentPhoto CreateEntity(MonumentPhoto entity = null)
        {
            MonumentPhoto monumentPhoto = null;
            if (entity != null)
            {
                monumentPhoto = entity;
                monumentPhoto.Description?.Localizations?.Clear();
                monumentPhoto.Sources?.Clear();
            }
            else
            {
                monumentPhoto = new MonumentPhoto
                {
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Sources = new List<Source>()
                };
            }
            monumentPhoto.Id = Id;
            monumentPhoto.Year = Year;
            monumentPhoto.Period = Period;
            monumentPhoto.PhotoId = PhotoId;
            monumentPhoto.MonumentId = MonumentId;

            monumentPhoto.Sources.AddRange(Sources);
            if (Description == null || Description.ToArray().Length == 0)
            {
                monumentPhoto.DescriptionId = null;
                monumentPhoto.Description = null;
            }
            else
            {
                foreach (var cultureValue in Description)
                {
                    monumentPhoto.Description.Localizations.Add(new Localization
                    {
                        CultureCode = cultureValue.Culture,
                        Value = cultureValue.Value.Trim()
                    });
                }
            }
            return monumentPhoto;
        }
    }
}