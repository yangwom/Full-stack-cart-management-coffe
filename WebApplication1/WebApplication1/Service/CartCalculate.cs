using CartApi.Interface;
using CartApi.Model;

namespace CartApi.Service
{
    public class CartCalculate : ICartCalculate
    {

        public List<CartItemPrice> CartItemPrice = new();
 
        public void CalculaCart(CartItemPrice cartItemPrice)
        {    
            cartItemPrice.Price *= cartItemPrice.Quantity;
   
        }

        public decimal CalculaCart(List<CartItemPrice> total)
        {
            var Total = total.Sum(x => x.Price);
            return Total;
        }

    }
}
