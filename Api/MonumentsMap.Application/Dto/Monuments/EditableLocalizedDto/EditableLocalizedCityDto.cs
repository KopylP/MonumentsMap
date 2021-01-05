using System.Collections.Generic;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto
{
    public class EditableLocalizedCityDto : BaseEditableLocalizedDto<City>
    {
        public List<CultureValuePair> Name { get; set; }

        public override City CreateEntity(City editableCity = null)
        {
            City city = null;
            if (editableCity != null)
            {
                city = editableCity;
                city.Id = Id;
                city.Name.Localizations.Clear();
            }
            else
            {
                city = new City
                {
                    Id = Id,
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    }
                };
            }


            foreach (var cultureValue in Name)
            {
                city.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValue.Culture,
                    Value = cultureValue.Value.Trim()
                });
            }

            return city;
        }
    }
}