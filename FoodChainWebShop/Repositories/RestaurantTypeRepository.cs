using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class RestaurantTypeRepository : IRestaurantTypeRepository {
        private readonly DataContext _context;
        public RestaurantTypeRepository (DataContext context) {
            this._context = context;
        }
        public async Task<ICollection<RestaurantType>> GetRestaurantTypes () {
            return await _context.RestaurantTypes
                .ToListAsync ();
        }
    }
}