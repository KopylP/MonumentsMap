using System;

namespace MonumentsMap.Application.Dto.Monuments.Filters
{
    public abstract class BaseRequestFilterDto
    {
        public int PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } = null;
    }
}
