"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";

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
              "my-2 px-2 md:px-4 py-2 mx-1 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2",
              className,
            )}
          >
            <span>{label}</span>

            <div className="relative w-5 h-5">
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
                      <IconArrowRight className="w-4 h-4 -rotate-45" />
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
                      <IconArrowRight className="w-4 h-4 -rotate-45" />
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
            "my-2 px-2 md:px-4 py-2 mx-1 opacity-80 hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2",
            className,
          )}
        >
          <span>{label}</span>
          <div className="relative w-5 h-5">
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
                    <IconArrowRight className="w-4 h-4 -rotate-45" />
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
                    <IconArrowRight className="w-4 h-4 -rotate-45" />
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
