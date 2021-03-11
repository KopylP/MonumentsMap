using MonumentsMap.Framework.Enums;

namespace MonumentsMap.Domain.FilterParameters
{
    public class BaseSortableFilterParameters<TSortBy> : BaseFilterParameters where TSortBy : struct
    {
        public TSortBy SortBy { get; set; }
        public SortDirection SortDirection { get; set; }
    }
}
