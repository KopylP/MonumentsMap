using System.Collections.Generic;
using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels.EditableLocalizedModels
{
    public class EditableLocalizedMonument : EditableLocalizedEntity<Monument>
    {
        public int Year { get; set; }
        public Period Period { get; set; }
        public List<CultureValuePair> Name { get; set; }
        public List<CultureValuePair> Description { get; set; }
        public int CityId { get; set; }
        public int StatusId { get; set; }
        public int ConditionId { get; set; }
        public bool Accepted { get; set; }
        public Creator Creator { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public override Monument CreateEntity(Monument entity = null)
        {
            Monument monument = null;
            if (entity != null)
            {
                monument = entity;
                monument.Description?.Localizations?.Clear();
                monument.Name?.Localizations?.Clear();
            }
            else
            {
                monument = new Monument
                {
                    Description = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Name = new LocalizationSet
                    {
                        Localizations = new List<Localization>()
                    },
                    Creator = this.Creator
                };
            }
            monument.Year = this.Year;
            monument.Period = this.Period;
            monument.CityId = this.CityId;
            monument.StatusId = this.StatusId;
            monument.ConditionId = this.ConditionId;
            monument.Accepted = this.Accepted;
            monument.Latitude = this.Latitude;
            monument.Longitude = this.Longitude;
            foreach (var cultureValuePair in Name)
            {
                monument.Name.Localizations.Add(new Localization
                {
                    CultureCode = cultureValuePair.Culture,
                    Value = cultureValuePair.Value
                });
            }
            foreach (var cultureValuePair in Description)
            {
                monument.Description.Localizations.Add(new Localization
                {
                    CultureCode = cultureValuePair.Culture,
                    Value = cultureValuePair.Value
                });
            }
            return monument;
        }
    }
}