using MonumentsMap.Entities.Enumerations;

namespace MonumentsMap.Entities.ViewModels
{
    public class ParticipantViewModel
    {
        public int Id { get; set; }
        public string DefaultName { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }
    }
}