using FoodChainWebShop.Interfaces;
using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Services {
    public class FavouritesService : IFavouritesService {
        private readonly IFavouritesRepository _favouritesRepo;
        public FavouritesService (IFavouritesRepository repo) {
            this._favouritesRepo = repo;
        }

        public async Task<ICollection<FavouriteProduct>> getFavourites (int userId) {
            return await _favouritesRepo.getFavourites(userId);
        }

        public async Task postFavourite (Favourite favourite) {
            await _favouritesRepo.postFavourite(favourite);
        }

        public async Task deleteFavourite (int userId, int productId) {
            await _favouritesRepo.deleteFavourite(userId, productId);
        }

    }
}