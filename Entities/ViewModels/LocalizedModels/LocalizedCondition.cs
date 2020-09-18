namespace MonumentsMap.Entities.ViewModels.LocalizedModels
{
    public class LocalizedCondition : LocalizedEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Abbreviation { get; set; }
    }
}