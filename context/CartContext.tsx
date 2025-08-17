"use client";

import { CartContextType, CartItem } from "@/types/types";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";

const CART_STORAGE_KEY = "cart";
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Use useRef to avoid unnecessary re-renders while maintaining cart state
  const cartRef = useRef<CartItem[]>([]);

  // Initialize from localStorage on first mount only
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Ensure all items have quantity of 1
        const normalizedCart = parsedCart.map((item: CartItem) => ({
          ...item,
          quantity: 1,
        }));
        cartRef.current = normalizedCart;
        // Force a re-render to ensure initial state is correct
        forceUpdate();
      }
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
    }
  }, []);

  // Force update mechanism for when we need to trigger re-renders
  const [, setForceUpdate] = React.useState({});
  const forceUpdate = useCallback(() => setForceUpdate({}), []);

  // Memoized cart operations to prevent unnecessary re-renders
  const addToCart = useCallback((item: CartItem) => {
    // Check if the item is already in the cart
    const existingItem = cartRef.current.find((i) => i.name === item.name);

    // If item doesn't exist, add it with quantity 1
    if (!existingItem) {
      cartRef.current = [...cartRef.current, { ...item, quantity: 1 }];
      // Save to localStorage and force a re-render
      persistCart();
      forceUpdate();
    }
    // If item already exists, do nothing (keeping quantity at 1)
  }, []);

  const removeFromCart = useCallback((name: string) => {
    cartRef.current = cartRef.current.filter((item) => item.name !== name);
    persistCart();
    forceUpdate();
  }, []);

  const clearCart = useCallback(() => {
    cartRef.current = [];
    localStorage.removeItem(CART_STORAGE_KEY);
    forceUpdate();
  }, []);

  // Helper function to persist cart to localStorage
  const persistCart = useCallback(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartRef.current));
    } catch (error) {
      console.error("Failed to save cart to storage:", error);
    }
  }, []);

  // Return the current cart value for consumers
  const value = {
    cart: cartRef.current,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
