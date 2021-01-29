namespace MonumentsMap.Domain.FilterParameters
{
    public abstract class BaseFilterParameters
    {
        public int PageNumber { get; set; } = 1;
        public int? PageSize { get; set; }
    }
}
