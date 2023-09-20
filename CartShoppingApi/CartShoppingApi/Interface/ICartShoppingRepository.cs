﻿using CartShoppingApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CartShoppingApi.Interface
{
    public interface ICartShoppingRepository
    {

        DbSet<PriceProduct> GetShoppingCart();

        Task<PriceProduct> GetShoppingCartById(int Id);
       
        Task<PriceProduct> GetShoppingCartUpdate(int Id, PriceProduct productPrice);

        Task GetShoppingCartRemove(int Id);

    }
}
