"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
const BgButton = ({
  children,
  className,
  icon = <ArrowRight className="h-4 w-4" />,
}: {
  children: string;
  className: string;
  icon?: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative mx-auto my-2 overflow-hidden rounded-md px-4 py-2 text-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static background - always visible */}
      <div className="from-primary via-primary to-primary/45 absolute inset-0 z-0 bg-gradient-to-r" />

      {/* Animated background that slides in from left */}
      <motion.div
        className="from-primary/40 to-primary absolute inset-0 z-10 bg-gradient-to-r"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Button content with text and icon */}
      <div className="relative z-20 flex items-center justify-center">
        {/* Icon on left when hovered */}
        {icon && isHovered && (
          <motion.span
            className="mr-2 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {icon}
          </motion.span>
        )}

        {/* Button text */}
        <span>{children}</span>

        {/* Icon on right when not hovered */}
        {icon && !isHovered && (
          <motion.span
            className="ml-2 flex items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};

export default BgButton;
