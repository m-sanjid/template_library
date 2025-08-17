import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface AnimatedNotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const AnimatedNotification: React.FC<AnimatedNotificationProps> = ({
  message,
  type = "info",
  isVisible,
  onClose,
  duration = 3000,
}) => {
  React.useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 rounded-lg p-4 text-white shadow-lg ${getTypeStyles()}`}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <div className="flex items-center justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {message}
            </motion.p>
            <motion.button
              className="ml-4 text-white hover:text-neutral-200"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedNotification;
