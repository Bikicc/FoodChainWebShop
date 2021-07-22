using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace FoodChainWebShop.Services {
    public class FavouritesService : IFavouritesService {
        private readonly IFavouritesRepository _favouritesRepo;
        public FavouritesService (IFavouritesRepository repo) {
            this._favouritesRepo = repo;
        }

        public async Task<ICollection<Favourite>> getFavourites (int userId) {
            var fav = await _favouritesRepo.getFavourites(userId);
            return fav.Where(f => f.Product.Deleted == false).ToList();
        }

        public async Task postFavourite (Favourite favourite) {
            await _favouritesRepo.postFavourite(favourite);
        }

        public async Task deleteFavourite (int userId, int productId) {
            await _favouritesRepo.deleteFavourite(userId, productId);
        }

    }
}