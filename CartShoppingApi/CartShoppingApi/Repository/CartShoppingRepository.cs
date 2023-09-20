using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CartShoppingApi.Repository
{
    public class CartShoppingRepository : ICartShoppingRepository
    {

        private readonly CartShoppingContext _context;
        public CartShoppingRepository(CartShoppingContext context)
        {
            _context = context;
        }

        public DbSet<PriceProduct> GetShoppingCart()
        {
            return _context.productPrice;
        }


        public async Task<PriceProduct> GetShoppingCartById(int Id)
        {
            return await GetShoppingCart().FirstAsync(cart => cart.Id == Id);
        }


        public async Task<PriceProduct> GetShoppingCartUpdate(int Id, PriceProduct priceProduct)
        {
           var productById = await GetShoppingCartById(Id);


            productById.ProductPrice =  priceProduct.ProductPrice;
            productById.Quantity = priceProduct.Quantity;
            productById.TotalByProduct = priceProduct.TotalByProduct;

            return productById;
        }


        public async Task GetShoppingCartRemove(int Id)
        {
           var Product = await GetShoppingCartById(Id);

           GetShoppingCart().Remove(Product);
        }



    }
}
