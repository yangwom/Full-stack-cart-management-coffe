using CartShoppingApi.Models;

namespace CartShoppingApi.Interface
{
    public interface ICartCalculateService
    {
        decimal CalculaCart();

        void CalculaCart(PriceProduct productPrice);
    }
}
