using CartShoppingApi.Data;
using CartShoppingApi.Interface;
using CartShoppingApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CartShoppingApi.Controllers
{
    [ApiController]
    [Route("produto")]
    public class CartShopping : ControllerBase
    {

        private readonly CartShoppingContext _context;
        private readonly ICartCalculateService _cartCalculateService;
        private readonly ICartShoppingRepository _cartShoppingRepository;
        private readonly ICartShoppingService _cartShoppingService;

        public CartShopping(ICartCalculateService cartCalculate, CartShoppingContext context, ICartShoppingRepository cartShoppingRepository, ICartShoppingService cartShoppingService)
        {
            _context = context;
            _cartCalculateService = cartCalculate;
            _cartShoppingRepository = cartShoppingRepository;
            _cartShoppingService = cartShoppingService;
        }


        [HttpGet]
        public IActionResult GetCartProduct()
        {
            var Total = _cartCalculateService.CalculaCart();
            var products = _cartShoppingService.GetShoppingCart();

            return Ok(new { products, Total });

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCartProductById(int Id)
        {
            try
            {
                var productById = await _cartShoppingService.GetShoppingCartById(Id);
                return Ok(productById);
            }
            catch {
 
                return StatusCode(StatusCodes.Status404NotFound, new { Status = 404,  Message = "Produto Não Encontrado"});

            }
      
        }


       

        [HttpPost("cadastrarproduto")]
        public IActionResult AddProductCart([FromBody] PriceProduct priceProduct)
        {

            try
            {
                _cartCalculateService.CalculaCart(priceProduct);
                _cartShoppingService.GetShoppingCart().Add(priceProduct);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, priceProduct);
            }
            catch
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { Status = 500, Message = "Erro em cadastrar o produto, entre em conttato com suporte" });

            }

        }


        [HttpPut("atualizarproduto/{id}")]
        public async Task<IActionResult> UpdateCartProducById(int Id, [FromBody] PriceProduct cartItemPrice)
        {
                
            try
            {
       
                 var UpdatedProduct = await _cartShoppingService.GetShoppingCartUpdate(Id, cartItemPrice);

                _cartCalculateService.CalculaCart(UpdatedProduct);

                _context.SaveChanges();

                return Ok(UpdatedProduct);
            }
            catch
            {

                return StatusCode(StatusCodes.Status404NotFound, new { Status = 404, Message = "Produto não encontrado" });

            }



        }


        [HttpDelete("deletarproduto/{id}")]
        public async Task<IActionResult> DeleteCartCoffeById(int Id)
        {

            try
            {
                await _cartShoppingRepository.GetShoppingCartRemove(Id);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status204NoContent, new { Status = 204,
                    Message = "Produto Deletado" });
            }
            catch
            {

                return StatusCode(StatusCodes.Status404NotFound, new { Status = 404, Message = "Produto Não Encontrado" });

            }
           

        }
    }
}

