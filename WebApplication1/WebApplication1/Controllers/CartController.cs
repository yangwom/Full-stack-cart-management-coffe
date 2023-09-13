using CartApi.Interface;
using CartApi.Model;
using CartApi.Service;
using Microsoft.AspNetCore.Mvc;

namespace CartApi.Controllers
{

    [ApiController]
    [Route("cartItem")]
    public class CartController : ControllerBase
    {
        public static int Id = 0;
        public static List<CartItemPrice> CarItemPrice = new();
        private readonly ICartCalculate _cartCalculate;

        public CartController(ICartCalculate cartCalculate)
        {

            _cartCalculate = cartCalculate;
        }

        [HttpPost("quantity")]
        public IActionResult CalculateCartCoffe([FromBody] CartItemPrice cartItemPrice)
        {
            cartItemPrice.Id = Id += 1;

           _cartCalculate.CalculaCart(cartItemPrice);

            CarItemPrice.Add(cartItemPrice);

            return Ok(cartItemPrice);

        }


        [HttpGet("total")]
        public IActionResult GetCartCoffe()
        {
            var Total = _cartCalculate.CalculaCart(CarItemPrice);

            return Ok(new { CarItemPrice, Total });

        }
    }
}
