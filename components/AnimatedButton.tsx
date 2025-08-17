"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import { Link } from "next-view-transitions";

type AnimatedButtonProps = {
  label: string;
  logo?: ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

export const AnimatedButton = ({
  label,
  logo,
  className,
  to,
  onClick,
  external = false,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {to ? (
        <Link
          target={external ? "_blank" : "_self"}
          rel="noopener noreferrer"
          href={to ? to : "#"}
        >
          <motion.button
            type={type}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
              "mx-1 my-2 flex items-center justify-center gap-2 px-2 py-2 opacity-80 transition-all duration-300 hover:opacity-100 md:px-4",
              className,
            )}
          >
            <span>{label}</span>

            <div className="relative h-5 w-5">
              <AnimatePresence mode="wait">
                {!isHovered ? (
                  <motion.div
                    key="initial-arrow"
                    initial={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-0 left-0"
                  >
                    {logo ? (
                      logo
                    ) : (
                      <IconArrowRight className="h-4 w-4 -rotate-45" />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="hover-arrow"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-0 left-0"
                  >
                    {logo ? (
                      logo
                    ) : (
                      <IconArrowRight className="h-4 w-4 -rotate-45" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </Link>
      ) : (
        <motion.button
          type={type}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClick}
          disabled={disabled}
          className={clsx(
            "mx-1 my-2 flex items-center justify-center gap-2 px-2 py-2 opacity-80 transition-all duration-300 hover:opacity-100 md:px-4",
            className,
          )}
        >
          <span>{label}</span>
          <div className="relative h-5 w-5">
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.div
                  key="initial-arrow"
                  initial={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-0 left-0"
                >
                  {logo ? (
                    logo
                  ) : (
                    <IconArrowRight className="h-4 w-4 -rotate-45" />
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="hover-arrow"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-0 left-0"
                >
                  {logo ? (
                    logo
                  ) : (
                    <IconArrowRight className="h-4 w-4 -rotate-45" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>
      )}
    </>
  );
};
