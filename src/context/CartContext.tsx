"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
} from "react";
import { toast } from "react-toastify";
import { IProduct } from "@/types";
import { DEFAULT_QUANTITY } from '@/constants'


interface ICartStateContext {
  cart: IProduct[];
}

interface ICartActionsContext {
  setCart: (data: IProduct[]) => void;
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  deleteCartItem: (productId: number) => void;
}

const initialCartState: ICartStateContext = {
  cart: [],
};

const CartStateContext = createContext<ICartStateContext>(initialCartState);

const CartActionsContext = createContext<ICartActionsContext>({
  setCart: (data: IProduct[]) => new Promise((resolve) => resolve(undefined)),
  addToCart: (product: IProduct, quantity: number) => ({}),
  removeFromCart: (productId: number) => ({}),
  deleteCartItem: (productId: number) => ({}),
});

export const CartStateProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<IProduct[]>([]);

  const addToCart = useCallback((product: IProduct, quantity: number) => {
    const productExistCart = cart.find(
      (productExist) => product.id === productExist.id
    );

    if (productExistCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      return;
    }
    toast.success("Produto adicionado ao carrinho");
    return setCart([...cart, product]);
  }, [cart]);

  const removeFromCart = useCallback((productId: number) => {
    const productsWithDecrement = cart?.map((prod) => {
      if (prod.id === productId && prod.quantity > 0) {
        return {
          ...prod,
          quantity: prod.quantity - DEFAULT_QUANTITY,
        };
      }
      return prod;
    }).filter(prod => prod.quantity > 0);
  
    setCart(productsWithDecrement);
  }, [cart]);

  const deleteCartItem = useCallback((productId: number) => {
    setCart((state) => state.filter((product) => product.id != productId));
  }, []);

  const cartActions = useMemo(
    () => ({
      setCart,
      addToCart,
      deleteCartItem,
      removeFromCart,
    }),
    [
      setCart,
      addToCart,
      deleteCartItem,
      removeFromCart,
    ]
  );

  return (
    <CartStateContext.Provider value={{ cart }}>
      <CartActionsContext.Provider value={cartActions}>
        {children}
      </CartActionsContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);

export const useCartActions = () => useContext(CartActionsContext);
