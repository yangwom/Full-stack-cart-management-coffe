using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;

namespace CartShoppingApi.Service
{
    public class CartCalculate : ICartCalculate
    {

        public List<CartItemPrice> CartItemPrice = new();

        private readonly CartShoppingContext _context;

        public CartCalculate(CartShoppingContext context)
        {
            _context = context;
        }

        public void CalculaCart(CartItemPrice cartItemPrice)
        {
  
            cartItemPrice.TotalByProduct = cartItemPrice.ProductPrice * cartItemPrice.Quantity;

        }

        public decimal CalculaCart()
        {
            var TotalCart =  _context.cartItemPrices.Sum(x => x.TotalByProduct);
            return TotalCart;
        }

    }
}
