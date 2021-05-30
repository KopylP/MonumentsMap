using MonumentsMap.Domain.Models.Common;
using MonumentsMap.Framework.Enums.Monuments;

namespace MonumentsMap.Domain.FilterParameters
{
    public class MonumentFilterParameters: BaseSortableFilterParameters<SortBy>
    {
        public int[] Statuses { get; set; }
        public int[] Conditions { get; set; }
        public int[] Cities { get; set; }
        public string[] StatusAbbreviations { get; set; }
        public string[] ConditionAbbreviations { get; set; }
        public string[] Tags { get; set; }
        public int? StartYear { get; set; }
        public int? EndYear { get; set; }
        public string CultureCode { get; set; }
        public bool Hidden { get; set; }
        public GeoPoint CurrentPosition { get; set; }
    }
}