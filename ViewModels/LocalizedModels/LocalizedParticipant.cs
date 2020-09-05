using MonumentsMap.Models;

namespace MonumentsMap.ViewModels.LocalizedModels
{
    public class LocalizedParticipant : LocalizedEntity
    {
        public int Id { get; set; }
        public string DefaultName { get; set; }
        public string Name { get; set; }
        public ParticipantRole? ParticipantRole { get; set; }
    }
}