import { motion } from "motion/react";
import React from "react";

interface AnimatedSpinnerProps {
  size?: number;
  color?: string;
}

const AnimatedSpinner: React.FC<AnimatedSpinnerProps> = ({
  size = 40,
  color = "#3B82F6",
}) => {
  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        style={{
          width: size,
          height: size,
          position: "relative",
        }}
        variants={circleVariants}
        animate="animate"
      >
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              width: size / 4,
              height: size / 4,
              borderRadius: "50%",
              backgroundColor: color,
              top: "50%",
              left: "50%",
              transform: `rotate(${index * 45}deg) translate(${size / 2}px, 0)`,
            }}
            variants={dotVariants}
            animate="animate"
            transition={{
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedSpinner;
