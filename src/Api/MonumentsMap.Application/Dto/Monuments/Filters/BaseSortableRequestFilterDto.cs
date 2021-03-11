using MonumentsMap.Framework.Enums;

namespace MonumentsMap.Application.Dto.Monuments.Filters
{
    public class BaseSortableRequestFilterDto<TSortBy> : BaseRequestFilterDto where TSortBy : struct
    {
        public TSortBy SortBy { get; set; }
        public SortDirection SortDirection { get; set; }
    }
}
