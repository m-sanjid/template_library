import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

interface AnimatedProgressBarProps {
  progress: number;
  height?: number;
  color?: string;
  showPercentage?: boolean;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  height = 8,
  color = "#3B82F6",
  showPercentage = true,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-full bg-neutral-200"
        style={{ height: `${height}px` }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${currentProgress}%` }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        />
      </div>
      {showPercentage && (
        <motion.div
          className="mt-1 text-sm text-neutral-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(currentProgress)}%
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedProgressBar;
