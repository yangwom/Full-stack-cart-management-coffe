using CartApi.Model;

namespace CartApi.Interface
{
    public interface ICartCalculate
    {
        decimal CalculaCart(List<CartItemPrice> total);

        void CalculaCart(CartItemPrice cartItemPrice);
    }
}
