"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import CheckoutButton from "@/components/CheckoutButton";
import { ShoppingCart, Trash2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "@/components/SectionHeader";
import { AnimatedButton } from "@/components/AnimatedButton";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    console.log("Cart Data:", cart);
  }, [cart]);

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-4">
          Looks like you haven&apos;t added any templates yet.
        </p>
        <AnimatedButton
          label="Browse Templates"
          className="border rounded-full bg-primary text-secondary"
          to="/templates"
        />
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-8 mt-20">
      <SectionHeader
        label="Shopping Cart"
        title="Shopping Cart"
        description=""
        gradientText="CART"
        textHeight={160}
      />
      <div className="flex justify-between items-center mb-8">
        <AnimatedButton
          label="Clear Cart"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-500 border rounded-full"
          onClick={() => clearCart()}
          logo={<Trash2 className="w-4 h-4 mr-2" />}
        />
      </div>

      <div className="border rounded-lg shadow-sm">
        <AnimatePresence>
          {cart.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`flex items-center justify-between p-6 ${
                index !== cart.length - 1 ? "border-b" : ""
              }`}
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
                <p className="text-muted-foreground text-sm mb-2">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Quantity: {item.quantity || 1}</span>
                  <span className="mx-2">•</span>
                  <span>${item.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">
                  ${(item.price * (item.quantity || 1)).toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => removeFromCart(item.name)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 bg-muted rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              By proceeding to checkout, you agree to our terms of service and
              acknowledge that all purchases are final.
            </p>
          </div>
          <CheckoutButton items={cart} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
