using MonumentsMap.Contracts.FilterParameters;

namespace MonumentsMap.Entities.FilterParameters
{
    public class MonumentFilterParameters : ILocalizedFilterParameters
    {
        public int[] Statuses { get; set; }
        public int[] Conditions { get; set; }
        public int[] Cities { get; set; }
        public int? StartYear { get; set; }
        public int? EndYear { get; set; }
    }
}