using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Interfaces {
    public interface IUserService {
        Task<ICollection<User>> GetOwners ();

    }
}