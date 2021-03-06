using MonumentsMap.Framework.Enums.Monuments;

namespace MonumentsMap.Application.Dto.Monuments
{
    public class SourceDto
    {
        public int? MonumentPhotoId { get; set; }
        public int? MonumentId { get; set; }
        public string Title { get; set; }
        public string SourceLink { get; set; }
        public SourceType? SourceType { get; set; }
    }
}