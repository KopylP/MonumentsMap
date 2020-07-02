using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Models
{
    public abstract class Entity
    {
        [Key]
        public int Id { get; set; }
    }
}