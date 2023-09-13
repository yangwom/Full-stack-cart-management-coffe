using CartShoppingApi.Models;

namespace CartShoppingApi.Interface
{
    public interface ICartCalculate
    {
        double CalculaCart();

        void CalculaCart(CartItemPrice cartItemPrice);
    }
}
