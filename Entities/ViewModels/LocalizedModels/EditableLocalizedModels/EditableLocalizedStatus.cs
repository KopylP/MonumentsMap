using System.Collections.Generic;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedStatus : EditableLocalizedEntity<Status>
    {
        public List<CultureValuePair> Name { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public string Abbreviation { get; set; }

        public override Status CreateEntity(Status editStatus = null)
        {
            Status status = null;
            if (editStatus != null)
            {
                status = editStatus;
                status.Name.Localizations.Clear();
                status.Description?.Localizations?.Clear();
            }
            else
            {
                status = new Status
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },

                };
            }

            status.Id = Id;
            status.Abbreviation = Abbreviation;


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