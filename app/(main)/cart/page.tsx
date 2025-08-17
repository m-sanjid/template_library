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
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <ShoppingCart className="text-muted-foreground mb-4 h-16 w-16" />
        <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
        <p className="text-muted-foreground mb-4">
          Looks like you haven&apos;t added any templates yet.
        </p>
        <AnimatedButton
          label="Browse Templates"
          className="bg-primary text-secondary rounded-full border"
          to="/templates"
        />
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  return (
    <div className="mx-auto mt-20 max-w-4xl p-8">
      <SectionHeader
        label="Shopping Cart"
        title="Shopping Cart"
        description=""
        gradientText="CART"
        textHeight={160}
      />
      <div className="mb-8 flex items-center justify-between">
        <AnimatedButton
          label="Clear Cart"
          className="rounded-full border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
          onClick={() => clearCart()}
          logo={<Trash2 className="mr-2 h-4 w-4" />}
        />
      </div>

      <div className="rounded-lg border shadow-sm">
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
                <h2 className="mb-1 text-lg font-semibold">{item.name}</h2>
                <p className="text-muted-foreground mb-2 text-sm">
                  {item.description}
                </p>
                <div className="text-muted-foreground flex items-center text-sm">
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
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeFromCart(item.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-muted mt-8 rounded-lg p-6">
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-muted-foreground flex items-start gap-2 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
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
