using Microsoft.AspNetCore.Mvc;

namespace MonumentsMap.Application.Dto.Monuments.Filters
{
    public class MonumentRequestFilterDto: BaseRequestFilterDto
    {
        public readonly static MonumentRequestFilterDto Empty = new MonumentRequestFilterDto { };

        [FromQuery(Name = "statuses[]")]
        public int[] Statuses { get; set; }

        [FromQuery(Name = "conditions[]")] 
        public int[] Conditions { get; set; }

        [FromQuery(Name = "cities[]")]
        public int[] Cities { get; set; }

        [FromQuery] 
        public int? StartYear { get; set; }

        [FromQuery] 
        public int? EndYear { get; set; }

        [FromQuery]
        public bool Hidden { get; set; }
    }
}
