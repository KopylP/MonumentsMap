using System.ComponentModel.DataAnnotations.Schema;

namespace MonumentsMap.Models
{
    public class MonumentPhoto
    {
        #region props
        public int Id { get; set; }
        public int? Year { get; set; }
        public Period? Period { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        public int MonumentId { get; set; }
        public int? DescriptionId { get; set; }
        #endregion
        #region  lazy props
        [ForeignKey("DescriptionId")]
        public virtual LocalizationSet Description { get; set; }
        #endregion
    }
}