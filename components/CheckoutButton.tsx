"use client";

import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface CheckoutItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface CheckoutButtonProps {
  items: CheckoutItem[];
  className?: string;
}

const CheckoutButton = ({ items, className }: CheckoutButtonProps) => {
  const {data:session} = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      if (!session) {
        toast.error("Please sign in to checkout");
        router.push("/login");
        return;
      }
      const { data } = await axios.post("/api/checkout", { items });

      if (data.url) {
        // Store items in session storage before redirecting
        sessionStorage.setItem("pending_purchase", JSON.stringify(items));
        window.location.href = data.url;
      } else {
        console.error("Failed to get checkout URL.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  // Check for successful purchase on component mount
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccess = urlParams.get("success") === "true";
    const pendingPurchase = sessionStorage.getItem("pending_purchase");

    if (isSuccess && pendingPurchase) {
      // Clear the pending purchase
      sessionStorage.removeItem("pending_purchase");
      // Emit purchase success event
      window.dispatchEvent(new Event("purchase_success"));
    }
  }, []);

  return (
    <Button 
      onClick={handleCheckout} 
      className={cn("w-full", className)}
    >
      Proceed to Checkout
    </Button>
  );
};

export default CheckoutButton;
