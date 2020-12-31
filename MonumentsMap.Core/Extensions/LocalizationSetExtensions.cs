using System.Collections.Generic;
using System.Linq;
using MonumentsMap.Application.Dto.Monuments.EditableLocalizedDto;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Core.Extensions
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

        public static string GetNameByCode(this LocalizationSet localizationSet, string cultureCode)
        {
            if (localizationSet == null || localizationSet.Localizations == null) return "";
            var name = localizationSet.Localizations.FirstOrDefault(p => p.CultureCode == cultureCode);
            return name?.Value ?? localizationSet.Localizations.FirstOrDefault()?.Value;
        }
    }
}