using System.Collections.Generic;
using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedStatus : EditableLocalizedEntity<Status>
    {
        public int Id { get; set; }
        public List<CultureValuePair> Name { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public string Abbreviation { get; set; }

        public override Status CreateEntity()
        {
            var status = new Status
            {
                Id = this.Id,
                Abbreviation = this.Abbreviation,
                Name = new LocalizationSet
                {
                    Localizations = new List<Localization>()
                },

            };

            foreach (var cultureValue in Name)
            {
                status.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValue.Culture,
                    Value = cultureValue.Value
                });
            }
            
            if (Description == null || Description.ToArray().Length == 0)
            {
                status.DescriptionId = null;
                status.Description = null;
            }
            else
            {
                status.Description = new LocalizationSet
                {
                    Localizations = new List<Localization>()
                };
                foreach (var cultureValue in Description)
                {
                    status.Description.Localizations.Add(new Localization
                    {
                        CultureCode = cultureValue.Culture,
                        Value = cultureValue.Value
                    });
                }
            }
            return status;
        }
    }
}