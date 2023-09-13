using System.ComponentModel.DataAnnotations;

namespace CartShoppingApi.Models
{
    public class CartItemPrice
    {

        [Key]
        [Required]
        public int Id { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
