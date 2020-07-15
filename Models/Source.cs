using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class Source : Entity
    {
        public int? MonumentPhotoId { get; set; }
        public int? MonumentId { get; set; }
        public string Title { get; set; }
        public string SourceLink { get; set; }
        [ForeignKey("MonumentPhotoId")]
        public MonumentPhoto MonumentPhoto { get; set; }
        [ForeignKey("MonumentId")]
        public Monument Monument { get; set; }
        
    }
}