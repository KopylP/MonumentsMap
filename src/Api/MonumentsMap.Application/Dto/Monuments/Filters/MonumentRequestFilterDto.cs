using Microsoft.AspNetCore.Mvc;
using MonumentsMap.Framework.Enums.Monuments;

namespace MonumentsMap.Application.Dto.Monuments.Filters
{
    public class MonumentRequestFilterDto: BaseSortableRequestFilterDto<SortBy>
    {
        public readonly static MonumentRequestFilterDto Empty = new MonumentRequestFilterDto { };

        [FromQuery(Name = "statuses[]")]
        public int[] Statuses { get; set; }

        [FromQuery(Name = "conditions[]")] 
        public int[] Conditions { get; set; }

        [FromQuery(Name = "cities[]")]
        public int[] Cities { get; set; }
        
        [FromQuery(Name = "statusAbbreviations[]")]
        public string[] StatusAbbreviations { get; set; }
        
        [FromQuery(Name = "conditionAbbreviations[]")]
        public string[] ConditionAbbreviations { get; set; }

        [FromQuery(Name = "tags[]")]
        public string[] Tags { get; set; }

        [FromQuery] 
        public int? StartYear { get; set; }

        [FromQuery] 
        public int? EndYear { get; set; }

        [FromQuery]
        public bool Hidden { get; set; }
    }
}
