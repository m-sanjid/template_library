"use client"

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'


const BgButton = ({
  children,
  className,
  icon = <ArrowRight className="w-4 h-4" />,
  iconPosition = "right"
}: {
  children: string,
  className: string,
  icon?: React.ReactNode,
  iconPosition?: "left" | "right"
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      className={`relative overflow-hidden px-4 py-2 rounded-md text-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary z-0" />
      
      {/* Animated background that slides in from left */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-400 to-secondary z-10"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Button content with text and icon */}
      <div className="relative z-20 flex items-center justify-center gap-2">
        {/* Icon on left if specified */}
        {icon && iconPosition === "left" && (
          <motion.span
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {icon}
          </motion.span>
        )}
        
        {/* Button text */}
        <span>{children}</span>
        
        {/* Icon on right if specified */}
        {icon && iconPosition === "right" && (
          <motion.span
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </motion.button>
  )
}

export default BgButton