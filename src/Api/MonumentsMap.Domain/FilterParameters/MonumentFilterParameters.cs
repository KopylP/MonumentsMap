namespace MonumentsMap.Domain.FilterParameters
{
    public class MonumentFilterParameters: BaseFilterParameters
    {
        public int[] Statuses { get; set; }
        public int[] Conditions { get; set; }
        public int[] Cities { get; set; }
        public int? StartYear { get; set; }
        public int? EndYear { get; set; }
        public string CultureCode { get; set; }
        public bool Hidden { get; set; }
    }
}