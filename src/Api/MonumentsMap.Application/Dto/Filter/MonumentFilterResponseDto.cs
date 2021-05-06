using System.Collections.Generic;
using MonumentsMap.Application.Dto.Monuments.LocalizedDto;

namespace MonumentsMap.Application.Dto.Filter
{
    public class MonumentFilterResponseDto
    {
        public IEnumerable<LocalizedCityDto> Cities { get; set; }
        public IEnumerable<LocalizedConditionDto> Conditions { get; set; }
        public IEnumerable<LocalizedStatusDto> Statuses { get; set; }
        public int[] YearsRange { get; set; }
    }
}
