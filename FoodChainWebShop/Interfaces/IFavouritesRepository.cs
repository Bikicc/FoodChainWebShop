using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces {
    public interface IFavouritesRepository {
        Task<ICollection<FavouriteProduct>> getFavourites (int userId);
        Task postFavourite (Favourite favourite);
        Task deleteFavourite (int userId, int productId);
    }
}