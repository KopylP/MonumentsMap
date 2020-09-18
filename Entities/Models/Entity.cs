using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Entities.Models
{
    public abstract class Entity
    {
        [Key]
        public int Id { get; set; }
    }
}