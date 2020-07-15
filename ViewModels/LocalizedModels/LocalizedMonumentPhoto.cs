using System.Collections.Generic;
using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels
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
        public List<Source> Sources {get; set;}
    }
}