using System.Collections.Generic;
using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Domain.Enumerations;
using MonumentsMap.Domain.Models;

namespace MonumentsMap.Application.Dto.Monuments.LocalizedDto
{
    public class LocalizedMonumentPhotoDto : BaseLocalizedDto
    {
        public int Id { get; set; }
        public int? Year { get; set; }
        public Period? Period { get; set; }
        public int MonumentId { get; set; }
        public string Description { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
        public bool MajorPhoto { get; set; }
        public List<SourceDto> Sources { get; set; }
    }
}