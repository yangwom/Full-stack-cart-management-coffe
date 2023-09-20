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


        public async Task<object> GetShoppingCartById(int Id)
        {
            var productById = await _repositoryCartShoppingRepository.GetShoppingCartById(Id);
            if (productById != null)
            {
                return productById;
            }

            return new { Message = "Produto não encontrado"};


        }


          public async Task<PriceProduct> GetShoppingCartUpdate(int Id, PriceProduct productPrice)
        {

         
                    var productById = await _repositoryCartShoppingRepository.GetShoppingCartById(Id);
                
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
