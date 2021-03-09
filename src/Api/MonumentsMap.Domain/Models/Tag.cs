using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MonumentsMap.Domain.Models
{
    public class Tag
    {
        [Key]
        [Required]
        public string TagName { get; set; }

        protected Tag() { }
        public Tag(string tagName)
        {
            if (string.IsNullOrEmpty(tagName))
            {
                throw new ArgumentException("Tag name couldn`t be empty or null");
            }
            TagName = tagName;
        }

        public virtual ICollection<Monument> Monuments { get; set; }
    }
}
