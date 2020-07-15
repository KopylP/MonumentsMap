using System.Collections.Generic;
using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels
{
    public class LocalizedMonument : LocalizedEntity
    {
        public int Id { get; set; }
        public int Year { get; set; }
        public Period Period { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public int StatusId { get; set; }
        public int ConditionId { get; set; }
        public bool Accepted { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<Source> Sources { get; set; }
    }
}