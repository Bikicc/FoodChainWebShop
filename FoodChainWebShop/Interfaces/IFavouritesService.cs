using FoodChainWebShop.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodChainWebShop.HelperClasses;

namespace FoodChainWebShop.Interfaces
{
    public interface IFavouritesService
    {
        Task<ICollection<Favourite>> getFavourites (int userId); 
        Task postFavourite (Favourite favourite);
        Task deleteFavourite (int userId, int productId);
    }
}