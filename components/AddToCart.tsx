"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const AddToCart = ({
  handleAddToCart,
  price,
}: {
  handleAddToCart: () => void;
  price?: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`relative flex items-center justify-center overflow-hidden rounded-lg px-6 py-1 transition-all duration-300 ${
        hovered
          ? "bg-primary text-primary-foreground shadow-md"
          : "bg-primary text-primary-foreground"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleAddToCart}
    >
      {/* Cart Icon with slide-in animation */}
      <div
        className={`absolute left-3 flex items-center justify-center transition-all duration-300 ease-in-out ${
          hovered ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        }`}
      >
        <ShoppingCart className="h-5 w-5" />
      </div>

      {/* Text that moves right when hovered */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          hovered ? "translate-x-3" : "translate-x-0"
        }`}
      >
        Add to Cart{" "}
        {price !== undefined && (
          <span className="ml-1 font-semibold">${price}</span>
        )}
      </div>
    </button>
  );
};
export default AddToCart;
