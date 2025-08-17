import { motion } from "motion/react";
import React from "react";

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
  size?: number;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  color = "#3B82F6",
  size = 56,
}) => {
  return (
    <motion.button
      className="fixed right-6 bottom-6 flex items-center justify-center rounded-full shadow-lg"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.div
        className="text-white"
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
};

export default FloatingActionButton;
