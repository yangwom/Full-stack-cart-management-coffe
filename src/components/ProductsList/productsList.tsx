"use client";
import { useState, useEffect, useCallback } from "react";

import { useCartActions } from "@/context/CartContext";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { DEFAULT_QUANTITY, DEFAULT_MAX_QUANTITY } from "@/constants";
import { IApiProduct, IProduct } from "@/types";

import maisImg from "@/assets/+.svg";
import menosImg from "@/assets/-.svg";
import buttonCart from "@/assets/ShoppingCartSimple.svg";
import Image from "next/image";

import style from "./styles.module.css";

export default function ProductList({products}: { products: IProduct[] }) {
  const [screenProducts, setScreenProducts] = useState<IProduct[]>(products);

  const { addToCart } =
    useCartActions();

  const addScreenItem = useCallback(
    (productId: number) => {
      const productsWithIncrement = screenProducts?.map((prod) => {
        if (prod.id === productId && prod.quantity < DEFAULT_MAX_QUANTITY) {
          return {
            ...prod,
            quantity: prod.quantity + DEFAULT_QUANTITY,
          };
        }
        return prod;
      });
      setScreenProducts(productsWithIncrement);
    },
    [screenProducts]
  );

  const removeScreenItem = useCallback(
    (productId: number) => {
      const productsWithIncrement = screenProducts?.map((prod) => {
        if (prod.id === productId && prod.quantity > DEFAULT_QUANTITY) {
          return {
            ...prod,
            quantity: prod.quantity - DEFAULT_QUANTITY,
          };
        }
        return prod;
      });
      setScreenProducts(productsWithIncrement);
    },
    [screenProducts]
  );

  return (
    <div className={style.containerCoffe}>
      <h1>Nossos Cafés</h1>
      <section className={style.containerList}>
        {screenProducts?.map(
          (product) =>
            product?.id && (
              <div key={product.id} className={style.cardCoffe}>
                <Image
                  className={style.coffeImg}
                  src={product.image_default?.img as StaticImport}
                  alt="coffee-img"
                />
                <div className={style.cardDescriptionAndName}>
                  <strong className={style.categoryStyle}>
                    {product.categoria}
                  </strong>
                  <h3 className={style.cardCoffeTitle}>
                    {product.product_name}
                  </h3>
                  <p className={style.cardCoffeDescription}>
                    {product.description}
                  </p>
                </div>
                <div className={style.cartAddQuantity}>
                  <div className={style.containerPrice}>
                    <p>R$</p>
                    <strong>{`${(
                      Math.round(
                        product.product_price * product.quantity * 100
                      ) / 100
                    ).toFixed(2)}`}</strong>
                  </div>
                  <div className={style.containerQuantity}>
                    <button
                      onClick={() => addScreenItem(product.id)}
                      className={style.buttonQuantity}
                    >
                      <Image id={`${product.id}`} src={maisImg} alt="" />
                    </button>

                    <strong>{product.quantity}</strong>
                    <button
                      onClick={() => removeScreenItem(product.id)}
                      className={style.buttonQuantity}
                    >
                      <Image src={menosImg} alt="" />
                    </button>
                  </div>

                  <button
                    onClick={() => addToCart(product, product.quantity)}
                    className={style.buttonAddCart}
                  >
                    <Image src={buttonCart} alt="" />
                  </button>
                </div>
              </div>
            )
        )}
      </section>
    </div>
  );
}
