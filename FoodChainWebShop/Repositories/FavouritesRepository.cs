using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodChainWebShop.Data;
using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using Microsoft.EntityFrameworkCore;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Repositories {
    public class FavouritesRepository : IFavouritesRepository {
        private readonly DataContext _context;
        public FavouritesRepository (DataContext context) {
            this._context = context;
        }

        public async Task<ICollection<FavouriteProduct>> getFavourites (int userId) {
            return await (from product in _context.Products 
                where product.Favourites.Any (p => p.UserId == userId) select new FavouriteProduct(product)).ToListAsync ();
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