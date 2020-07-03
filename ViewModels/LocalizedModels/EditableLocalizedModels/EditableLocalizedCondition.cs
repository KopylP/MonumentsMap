using System.Collections.Generic;
using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedCondition : EditableLocalizedEntity<Condition>
    {
        public int Id { get; set; }
        public List<CultureValuePair> Name { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public string Abbreviation { get; set; }

        public override Condition CreateEntity()
        {
           var condition = new Condition
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
                condition.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValue.Culture,
                    Value = cultureValue.Value
                });
            }
            
            if (Description == null || Description.ToArray().Length == 0)
            {
                condition.DescriptionId = null;
                condition.Description = null;
            }
            else
            {
                condition.Description = new LocalizationSet
                {
                    Localizations = new List<Localization>()
                };
                foreach (var cultureValue in Description)
                {
                    condition.Description.Localizations.Add(new Localization
                    {
                        CultureCode = cultureValue.Culture,
                        Value = cultureValue.Value
                    });
                }
            }
            return condition;
        }
    }
}