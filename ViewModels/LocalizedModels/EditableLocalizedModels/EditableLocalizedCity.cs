using System;
using System.Collections.Generic;
using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedCity : EditableLocalizedEntity<City>
    {
        #region props
        public List<CultureValuePair> Name { get; set; }
        #endregion
        #region  EditableLocalizedEntity methods
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
                    Id = this.Id,
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
                    Value = cultureValue.Value
                });
            }

            return city;
        }
        #endregion
    }
}