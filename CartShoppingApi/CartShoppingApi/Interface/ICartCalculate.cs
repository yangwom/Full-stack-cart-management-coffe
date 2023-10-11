using CartShoppingApi.Models;

namespace CartShoppingApi.Interface
{
    public interface ICartCalculateService
    {
        decimal CalculaCart();
        decimal CalculaCart(List<AddProductCart> AddProductCart);

        void CalculaCart(PriceProduct productPrice);
        void CalculaCart(AddProductCart productPrice);
    }
}
