"use client";
import Image from "next/image";

import { Header } from "@/components/Header/header";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useCartState, useCartActions } from "@/context/CartContext";
import { DEFAULT_QUANTITY } from '@/constants'
import mais from "@/assets/+.svg";
import menos from "@/assets/-.svg";
import deleted from "@/assets/deleted.svg";
import styles from "./styles.module.css";
import { useState } from "react";
import { insertClient } from "@/services/Product/insertClient";
import { insertOrder } from "@/services/Product/insertOrder";
import { insertOrdersItems } from "@/services/Product/insertOrderItems";


const Cart = () => {
  const { cart } = useCartState();
  const [progress, setProgress] = useState<boolean>(false)
  const [buttonValue, setButtonValue] = useState<'PROSSEGUIR' | 'COMFIRMAR PEDIDO'>('PROSSEGUIR')
  const [nameValue, setNameValue] = useState<string>('')
  const [methodPayment, setMethodPayment] = useState<'pix' | 'cartão de crédito' | 'cartão de débito'>('pix')
  const { deleteCartItem, addToCart, removeFromCart } = useCartActions();

  const total = cart.reduce(
    (total, product) => total + product.product_price * product.quantity,
    0
  );

  const handleProgress = async () => {
     setProgress(true)
     if (buttonValue === 'PROSSEGUIR') {
       setButtonValue('COMFIRMAR PEDIDO')
     }
 
     if (nameValue.length != 0 && buttonValue === 'COMFIRMAR PEDIDO') {
       const dataClient = await insertClient(nameValue)
 
 
       for (let client of dataClient as any) {
 
         const dataOrder = await insertOrder(total, methodPayment, client.id, 'em andamento')
 
         for (let cartProduct of cart) {
           for (let order of dataOrder as any) {
             await insertOrdersItems(cartProduct.id, order.id, cartProduct.quantity, cartProduct.product_price)
           }
         }
       }
     }
      
      setNameValue('')
    }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMethodPayment = event.target.value;

    if (['pix', 'cartão de crédito', 'cartão de débito'].includes(newMethodPayment)) {
      setMethodPayment(newMethodPayment as 'pix' | 'cartão de crédito' | 'cartão de débito');
    } else {
      console.error('Forma de pagamento inválida');
    }
  };

  return (
    <main>
      <Header />
      <section className={styles.cartContainer}>
        <header className={styles.Cartheader}>
          <h3>Produtos Selecionados</h3>
        </header>
        {cart.map((productCart) => (
          <div className={styles.productSelected} key={productCart.id}>
            <Image
              src={productCart.image_default?.img as StaticImport}
              alt=""
            />
            <div className={styles.productDetails}>
              <p>{productCart.product_name}</p>
              <div className={styles.quantityCartProduct}>
                <button onClick={() => addToCart(productCart, DEFAULT_QUANTITY)}>
                  {" "}
                  <Image className={styles.imageQuantity} src={mais} alt={""} />
                </button>
                <strong>{productCart.quantity}</strong>
                <button onClick={() => removeFromCart(productCart.id)}>
                  <Image className={styles.imageQuantity} src={menos} alt={""} />
                </button>

                <button
                  onClick={() => deleteCartItem(productCart.id)}
                  className={styles.buttonDelete}
                >
                  <Image className={styles.imageDelete} src={deleted} alt={""} />
                  <p>REMOVER</p>
                </button>
              </div>
            </div>

            <strong>
              {" "}
              {`R$ ${(
                Math.round(
                  productCart.product_price * productCart.quantity * 100
                ) / 100
              ).toFixed(2)}`}
            </strong>
          </div>
        ))}
        <div className={styles.descriptionTotal}>
          <h3 className={styles.containerOrder}>{`TOTAL: R$ ${(
            Math.round(total * 100) / 100
          ).toFixed(2)}`}</h3>
          {progress && (
            <>
              <input
                onChange={(e) => setNameValue(e.target.value)}
                className={styles.inputName}
                value={nameValue}
                placeholder="nome"
                type="text" />
              <div className={styles.payment}>
                <label htmlFor="method">forma de pagamento</label>
                <select value={methodPayment} onChange={handleSelectChange} id="method">
                  <option value="pix">pix</option>
                  <option value="cartão de crédito">cartão de credito</option>
                  <option value="cartão de débito">cartão de débito</option>
                </select>
              </div>
            </>
          )}
          <button onClick={handleProgress} className={styles.confirmingOrder}>{buttonValue}</button>
        </div>
      </section>
    </main>
  );
};

export default Cart;
