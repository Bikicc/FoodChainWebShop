using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace FoodChainWebShop.Models {
    public class Role {
        public int RoleId { get; set; }

        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public ICollection<User> Users { get; set; }
    }
}