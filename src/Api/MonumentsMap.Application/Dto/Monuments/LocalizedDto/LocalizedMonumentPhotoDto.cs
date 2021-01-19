using System.Collections.Generic;
using MonumentsMap.Application.Dto.Localized;
using MonumentsMap.Application.Dto.Photo;
using MonumentsMap.Framework.Enums.Monuments;

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
        public PhotoDto Photo { get; set; }
        public bool MajorPhoto { get; set; }
        public List<SourceDto> Sources { get; set; }
    }
}