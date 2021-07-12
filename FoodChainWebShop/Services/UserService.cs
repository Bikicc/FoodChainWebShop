using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;

namespace FoodChainWebShop.Services {
    public class UserService : IUserService{
        private readonly IUserRepository _userRepo;

        public UserService (IUserRepository repo) {
            this._userRepo = repo;
        }

        public async Task<ICollection<User>> GetOwners () {
            return await _userRepo.getOwners ();
        }
    }
}