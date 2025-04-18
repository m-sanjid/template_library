"use client";

import React, { useState } from "react";

interface ToggleProps {
  label?: string;
  initialState?: boolean;
  onChange?: (isToggled: boolean) => void;
  variant?: "rounded" | "square" | "pill";
  size?: "sm" | "md" | "lg";
  colorScheme?: "blue" | "green" | "purple" | "gray" | "eden";
}

const Toggle: React.FC<ToggleProps> = ({
  label = "Toggle",
  initialState = false,
  onChange,
  variant = "rounded", // 'rounded', 'square', 'pill'
  size = "md", // 'sm', 'md', 'lg'
  colorScheme = "blue", // 'blue', 'green', 'purple', 'gray', 'eden'
}) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  // Define variant-specific styles
  const variantStyles = {
    rounded: "rounded-lg",
    square: "rounded-none",
    pill: "rounded-full",
  };

  // Define size-specific styles
  const sizeStyles = {
    sm: {
      toggle: "h-5 w-9",
      circle: "h-4 w-4",
      translateX: isToggled ? "translate-x-4" : "translate-x-0",
    },
    md: {
      toggle: "h-6 w-11",
      circle: "h-5 w-5",
      translateX: isToggled ? "translate-x-5" : "translate-x-0",
    },
    lg: {
      toggle: "h-7 w-14",
      circle: "h-6 w-6",
      translateX: isToggled ? "translate-x-7" : "translate-x-0",
    },
  };

  // Define color scheme styles
  const colorSchemes = {
    blue: isToggled ? "bg-blue-600" : "bg-gray-200",
    green: isToggled ? "bg-green-600" : "bg-gray-200",
    purple: isToggled ? "bg-purple-600" : "bg-gray-200",
    gray: isToggled ? "bg-gray-700" : "bg-gray-300",
    eden: isToggled ? "bg-gray-800" : "bg-gray-900",
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm font-medium text-gray-700">{label}</span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isToggled}
        onClick={handleToggle}
        className={`relative inline-flex flex-shrink-0 cursor-pointer border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colorScheme.split("-")[0]}-500 ${variantStyles[variant]} ${sizeStyles[size].toggle} ${colorSchemes[colorScheme]}`}
      >
        <span className="sr-only">Toggle {label}</span>
        <span
          className={`pointer-events-none inline-block ${variant === "square" ? "rounded-none" : "rounded-full"} bg-white shadow ring-0 transition duration-200 ease-in-out ${sizeStyles[size].circle} ${sizeStyles[size].translateX}`}
        />
      </button>
    </div>
  );
};

export default Toggle;
