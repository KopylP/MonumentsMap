using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Entities.Models
{
    public class Source : BusinessEntity
    {
        public int? MonumentPhotoId { get; set; }
        public int? MonumentId { get; set; }
        [Required]
        public string Title { get; set; }
        public string SourceLink { get; set; }
        [ForeignKey("MonumentPhotoId")]
        public MonumentPhoto MonumentPhoto { get; set; }
        [ForeignKey("MonumentId")]
        public Monument Monument { get; set; }

    }
}