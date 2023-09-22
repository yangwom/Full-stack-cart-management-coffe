using CartShoppingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CartShoppingApi.Data
{
    public class CartShoppingContext : DbContext
    {
        public CartShoppingContext(DbContextOptions<CartShoppingContext> opts) : base(opts)
        {
        }

        public DbSet<PriceProduct> productPrice { get; set; }
   
    };
}
