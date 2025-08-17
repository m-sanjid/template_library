import { motion } from "motion/react";
import React from "react";

interface AnimatedCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <motion.div
      className="w-80 overflow-hidden rounded-lg bg-white shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <motion.div
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h3
          className="mb-2 text-xl font-bold"
          whileHover={{ color: "#3B82F6" }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-neutral-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCard;
