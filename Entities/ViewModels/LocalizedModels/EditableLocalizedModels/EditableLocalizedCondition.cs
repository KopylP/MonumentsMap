using System.Collections.Generic;
using MonumentsMap.Entities.Models;

namespace MonumentsMap.Entities.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedCondition : EditableLocalizedEntity<Condition>
    {
        public List<CultureValuePair> Name { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public string Abbreviation { get; set; }

        public override Condition CreateEntity(Condition editCondition = null)
        {
            Condition condition = null;
            if (editCondition != null)
            {
                condition = editCondition;
                condition.Name.Localizations.Clear();
                condition.Description?.Localizations?.Clear();
            }
            else
            {
                condition = new Condition
                {
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },

                };
            }

            condition.Id = Id;
            condition.Abbreviation = Abbreviation;

            foreach (var cultureValue in Name)
            {
                condition.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValue.Culture,
                    Value = cultureValue.Value.Trim()
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
                        Value = cultureValue.Value.Trim()
                    });
                }
            }
            return condition;
        }
    }
}