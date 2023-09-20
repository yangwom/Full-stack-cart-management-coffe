using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace CartShoppingApi.Models
{
    public class PriceProduct
    {

        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [Precision(18, 2)]
        public decimal ProductPrice { get; set; }

        [Required]
        [Range(1, 100, ErrorMessage = "A quntidade não pode ser 0")]
        public int Quantity { get; set; }

        [Precision(18, 2)]
        public decimal TotalByProduct { get; set; } 
    }
}
