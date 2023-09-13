using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CartShoppingApi.Controllers
{
    [ApiController]
    [Route("cartItem")]
    public class CartShoppingCoffe : ControllerBase
    {

        private readonly CartShoppingContext _context;
        private readonly ICartCalculate _cartCalculate;

        public CartShoppingCoffe(ICartCalculate cartCalculate, CartShoppingContext context)
        {
            _context = context;
            _cartCalculate = cartCalculate;
        }

        [HttpPost("quantity")]
        public IActionResult CalculateCartCoffe([FromBody] CartItemPrice cartItemPrice)
        {

            _cartCalculate.CalculaCart(cartItemPrice);

            _context.cartItemPrices.Add(cartItemPrice);
            _context.SaveChanges();

            return Ok(cartItemPrice);

        }


        [HttpGet("total")]
        public IActionResult GetCartCoffe()
        {
            var Total = _cartCalculate.CalculaCart();

            return Ok(new {_context.cartItemPrices, Total});

        }
    }
}

