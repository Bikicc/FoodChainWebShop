using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IUserRepository {
        Task<ICollection<User>> getOwners ();
    }
}