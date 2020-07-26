using System.Collections.Generic;
using System.Linq;
using MonumentsMap.Models;
using MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels;

namespace MonumentsMap.Extensions
{
    public static class LocalizationSetExtensions
    {
        public static List<CultureValuePair> GetCultureValuePairs(this LocalizationSet localizationSet) => localizationSet
            .Localizations
            .Select(p => new CultureValuePair
            {
                Culture = p.CultureCode,
                Value = p.Value
            })
            .ToList();
    }
}