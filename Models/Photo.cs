namespace MonumentsMap.Models
{
    public class Photo : Entity
    {
        public string FileName { get; set; }
        public virtual MonumentPhoto MonumentPhoto { get; set; }
    }
}