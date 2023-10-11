using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;

namespace CartShoppingApi.Service
{
    public class CartCalculateService : ICartCalculateService
    {

        private readonly CartShoppingContext _context;

        public CartCalculateService(CartShoppingContext context)
        {
            _context = context;
      
        }

        public decimal CalculaCart(List<AddProductCart> AddProductCart)
        {

          var total = AddProductCart.Sum(x => x.TotalByProduct);

          return total;
        }

        public void CalculaCart(PriceProduct priceProduct)
        {
  
            priceProduct.TotalByProduct = priceProduct.ProductPrice * priceProduct.Quantity;

        }

        public void CalculaCart(AddProductCart priceProduct)
        {

            priceProduct.TotalByProduct = priceProduct.Price * priceProduct.Quantity;

        }

        public decimal CalculaCart()
        {
            var TotalCart =  _context.productPrice.Sum(x => x.TotalByProduct);

            return TotalCart;
        }

    }
}
