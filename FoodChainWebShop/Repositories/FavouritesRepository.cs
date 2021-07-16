using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.HelperClasses;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodChainWebShop.Repositories {
    public class FavouritesRepository : IFavouritesRepository {
        private readonly DataContext _context;
        public FavouritesRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<Favourite>> getFavourites (int userId) {
            return await _context.Favourites
                .Include (f => f.Product)
                    .ThenInclude (fp => fp.Restaurant)
                .Where (fp => fp.UserId == userId)
                .ToListAsync ();
        }

        public async Task postFavourite (Favourite favourite) {
            _context.Favourites.Add (favourite);
            await _context.SaveChangesAsync ();
        }

        public async Task deleteFavourite (int userId, int productId) {
            Favourite favourite = await _context.Favourites.FirstOrDefaultAsync (f => f.UserId == userId && f.ProductId == productId);

            _context.Favourites.Remove (favourite);
            await _context.SaveChangesAsync ();
        }

    }
}