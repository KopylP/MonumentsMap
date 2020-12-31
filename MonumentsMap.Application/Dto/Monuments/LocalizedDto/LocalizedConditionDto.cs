namespace MonumentsMap.Application.Dto.Monuments.LocalizedDto
{
    public class LocalizedConditionDto : BaseLocalizedDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Abbreviation { get; set; }
    }
}