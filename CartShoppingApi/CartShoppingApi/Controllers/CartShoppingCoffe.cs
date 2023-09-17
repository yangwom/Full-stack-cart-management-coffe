using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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


        [HttpGet]
        public IActionResult GetCartCoffe()
        {
            var Total = _cartCalculate.CalculaCart();

            return Ok(new { _context.cartItemPrices, Total });

        }

        [HttpPost("cadastarproduto")]
        public IActionResult AddProductCart([FromBody] CartItemPrice cartItemPrice)
        {

            _cartCalculate.CalculaCart(cartItemPrice);

            _context.cartItemPrices.Add(cartItemPrice);
            _context.SaveChanges();

            return Ok(cartItemPrice);

        }


        [HttpPut("atualizarproduto/{id}")]
        public IActionResult UpdateCartCoffeById(int Id, CartItemPrice cartItemPrice)
        {
            var ExistCartItem = _context.cartItemPrices.First(cartOne => cartOne.Id == Id);
            if (ExistCartItem != null)
            {
                ExistCartItem.Quantity = cartItemPrice.Quantity;
                ExistCartItem.ProductPrice = cartItemPrice.ProductPrice;
                _cartCalculate.CalculaCart(ExistCartItem);
                _context.SaveChanges();
                return Ok(ExistCartItem);
            }

            return NotFound();

        }



        [HttpPatch("atualizarquantidade/{id}")]
        public IActionResult UpdateCartQuantityCoffeById(int Id, CartItemPrice cartItemPrice)
        {
            var ExistCartItem = _context.cartItemPrices.First(cartOne => cartOne.Id == Id);
            if (ExistCartItem != null)
            {
                ExistCartItem.Quantity = cartItemPrice.Quantity;
                _cartCalculate.CalculaCart(ExistCartItem);
                _context.SaveChanges();
                return Ok(ExistCartItem);
            }

            return NotFound();

        }




        [HttpDelete("deletarproduto/{id}")]
        public IActionResult DeleteCartCoffeById(int Id)
        {
            var CoffeById = _context.cartItemPrices.First(cartOne => cartOne.Id == Id);
            _context.cartItemPrices.Remove(CoffeById);
            _context.SaveChanges();
            return Ok("item excluio com sucesso");

        }
    }
}

