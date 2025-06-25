"use client"

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
const BgButton = ({
  children,
  className,
  icon=<ArrowRight className='w-4 h-4'/>
}: {
  children: string,
  className: string,
  icon?: React.ReactNode
}) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.button
      className={`relative mx-auto my-2 overflow-hidden px-4 py-2 rounded-md text-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static background - always visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/45 z-0" />
      
      {/* Animated background that slides in from left */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary z-10"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
      
      {/* Button content with text and icon */}
      <div className="relative z-20 flex items-center justify-center">
        {/* Icon on left when hovered */}
        {icon && isHovered && (
          <motion.span
            className="flex items-center mr-2"
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
            className="flex items-center ml-2"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </motion.button>
  )
}

export default BgButton