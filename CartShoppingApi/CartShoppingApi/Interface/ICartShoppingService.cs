using CartShoppingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CartShoppingApi.Interface
{
    public interface ICartShoppingService
    {

        DbSet<PriceProduct> GetShoppingCart();

        Task<object> GetShoppingCartById(int Id);

        Task<PriceProduct> GetShoppingCartUpdate(int Id, PriceProduct cartItemPrice);

        Task GetShoppingCartRemove(int Id);
    }
}
