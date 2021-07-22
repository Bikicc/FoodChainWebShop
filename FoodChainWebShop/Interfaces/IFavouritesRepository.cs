using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodChainWebShop.Interfaces {
    public interface IFavouritesRepository {
        Task<ICollection<Favourite>> getFavourites (int userId);
        Task postFavourite (Favourite favourite);
        Task deleteFavourite (int userId, int productId);
    }
}