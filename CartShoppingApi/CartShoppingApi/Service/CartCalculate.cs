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
            cartItemPrice.Price *= cartItemPrice.Quantity;

        }

        public double CalculaCart()
        {
            var Total =  _context.cartItemPrices.Sum(x => x.Price);
            return Total;
        }

    }
}
