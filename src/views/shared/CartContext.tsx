"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product, ShopProduct } from "@/models/ecommerce";

type CartProduct = Product | ShopProduct;

type CartContextValue = {
  addToCart: (product: CartProduct) => void;
  clearCart: () => void;
  itemCount: number;
  items: CartItem[];
  removeFromCart: (id: string) => void;
  subtotal: number;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "mugnee-cart";

function getDesigner(product: CartProduct) {
  return "designer" in product ? product.designer : product.brand;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const storedCart = window.localStorage.getItem(storageKey);
      return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      addToCart(product) {
        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === product.id);

          if (existingItem) {
            return currentItems.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
            );
          }

          return [
            ...currentItems,
            {
              id: product.id,
              image: product.image,
              designer: getDesigner(product),
              name: product.name,
              price: product.price,
              quantity: 1,
            },
          ];
        });
      },
      clearCart() {
        setItems([]);
      },
      itemCount,
      items,
      removeFromCart(id) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
      },
      subtotal,
      updateQuantity(id, quantity) {
        const nextQuantity = Math.max(1, Math.min(99, Math.round(quantity) || 1));

        setItems((currentItems) =>
          currentItems.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item)),
        );
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
