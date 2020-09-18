using System.Collections.Generic;
using MonumentsMap.Entities.Enumerations;
using MonumentsMap.Entities.Models;
using MonumentsMap.Entities.ViewModels;

namespace MonumentsMap.Entities.ViewModels.LocalizedModels
{
    public class LocalizedMonumentPhoto : LocalizedEntity
    {
        public int Id { get; set; }
        public int? Year { get; set; }
        public Period? Period { get; set; }
        public int MonumentId { get; set; }
        public string Description { get; set; }
        public int PhotoId { get; set; }
        public Photo Photo { get; set; }
        public bool MajorPhoto { get; set; }
        public List<SourceViewModel> Sources { get; set; }
    }
}