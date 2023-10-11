using CartShoppingApi.Interface;
using CartShoppingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CartShoppingApi.Repository
{
    public class CartShoppingService : ICartShoppingService
    {

        private readonly ICartShoppingRepository _repositoryCartShoppingRepository;

        public CartShoppingService(ICartShoppingRepository repositoryCartShoppingRepository)
        {
            _repositoryCartShoppingRepository = repositoryCartShoppingRepository;
        }

        public DbSet<PriceProduct> GetShoppingCart()
        {

            return _repositoryCartShoppingRepository.GetShoppingCart();

        }


        public async Task<PriceProduct> GetShoppingCartById(int Id)
        {
            var productById = await _repositoryCartShoppingRepository.GetShoppingCartById(Id);
            if (productById != null)
            {
                return productById;
            }

            return null;


        }


        public async Task<PriceProduct> GetShoppingCartUpdate(int Id, PriceProduct productPrice)
        {


            var productById = await _repositoryCartShoppingRepository.GetShoppingCartById(Id);
            productById.Type = productPrice.Type?.Length == 0 ? productById.Type : productPrice.Type;
            productById.ProductName = productPrice.ProductName?.Length == 0 ? productById.ProductName : productPrice.ProductName;
            productById.DesCription = productPrice.DesCription?.Length == 0 ? productById.DesCription : productPrice.DesCription;
            productById.ProductPrice = productPrice.ProductPrice == 0 ? productById.ProductPrice : productPrice.ProductPrice;
            productById.Quantity = productPrice.Quantity == 0 ? productById.Quantity : productPrice.Quantity;
            productById.TotalByProduct = productPrice.TotalByProduct == 0 ? productById.TotalByProduct : productPrice.TotalByProduct;

            return productById;

        }


        public async Task GetShoppingCartRemove(int Id)
        {
            var Product = await _repositoryCartShoppingRepository.GetShoppingCartById(Id);

            _repositoryCartShoppingRepository.GetShoppingCart().Remove(Product);

        }



    }
}
