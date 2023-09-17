using CartShoppingApi.Models;

namespace CartShoppingApi.Interface
{
    public interface ICartCalculate
    {
        decimal CalculaCart();

        void CalculaCart(CartItemPrice cartItemPrice);
    }
}
