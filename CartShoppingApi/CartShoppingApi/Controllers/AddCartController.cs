
using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CartShoppingApi.Controllers
{
    [Route("carrinho")]
    public class AddCartController : ControllerBase
    {

        private readonly ICartCalculateService _cartCalculateService;
        private readonly ICartShoppingService _cartShoppingService;
        private static List<AddProductCart> _productsCart = new();


        public AddCartController(ICartCalculateService cartCalculateService, ICartShoppingService cartShoppingService)
        {
            _cartCalculateService = cartCalculateService;
            _cartShoppingService = cartShoppingService;
        }



        [HttpGet("buscarcarrinho")]
        public IActionResult GetCart()
        {
            var total = _cartCalculateService.CalculaCart(_productsCart);
            return Ok(new { _productsCart, total });

        }

        [HttpPost("adicionarcarrinho/{id}")]

        public async Task<IActionResult> AddCart(int Id, [FromBody] AddProductCart priceProduct)
        {
            var product = await _cartShoppingService.GetShoppingCartById(Id);

            priceProduct.Id = product.Id;
            priceProduct.Name = product.ProductName;
            priceProduct.Price = product.ProductPrice;
            priceProduct.Quantity = product.Quantity;
            priceProduct.TotalByProduct = product.TotalByProduct;
            _productsCart.Add(priceProduct);

            return StatusCode(StatusCodes.Status201Created, priceProduct);
        }

        [HttpPatch("atualizarquantidade/{id}")]

        public IActionResult UpdateQuantityProduct(int Id, [FromBody] int quantity)
        {
            var product = _productsCart.FirstOrDefault(x => x.Id == Id);

            if (product == null)
            {
                return NotFound();
            }

            product.Quantity = quantity;

            _cartCalculateService.CalculaCart(product);

            return StatusCode(StatusCodes.Status202Accepted, product);
        }

        [HttpDelete("deletarproduto/{id}")]

        public IActionResult deleteCartProduct(int Id)
        {
            var product = _productsCart.FirstOrDefault(x => x.Id == Id) ;

            if (product == null)
            {
                return NotFound();
            }

            var deleted = _productsCart.Remove(product);

            return StatusCode(StatusCodes.Status204NoContent, deleted);
        }

    }


}
