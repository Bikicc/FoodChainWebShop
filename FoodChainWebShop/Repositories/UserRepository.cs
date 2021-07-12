using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class UserRepository : IUserRepository {
        private readonly DataContext _context;
        private enum rolesId {
            admin = 1,
            vlasnik = 2,
            korisnik = 3
        }
        public UserRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<User>> getOwners () {
            return await _context.Users
                .Where (u => u.RoleId == (int) rolesId.vlasnik)
                .ToListAsync ();
        }
    }
}