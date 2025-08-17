"use client";

import { ArrowRight, Sparkles, Code, Zap, Rocket } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { HERO_FEATURES } from "@/lib/config";
import { Session } from "next-auth";
import MotionButton from "./MotionButton";

const HeroSection = ({ session }: { session: Session | null }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative mx-auto my-8 h-[44rem] max-w-7xl overflow-hidden rounded-2xl border border-dashed border-neutral-200 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 px-4 py-20 sm:px-6 lg:px-8 dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="bg-grid-pattern absolute inset-0 opacity-10 dark:opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto my-20 max-w-7xl"
      >
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center rounded-full border border-neutral-200 bg-black/5 px-4 py-2 backdrop-blur-sm dark:border-neutral-800 dark:bg-white/5"
          >
            <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              New: Custom Template on Request
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl dark:from-white dark:to-neutral-400"
          >
            Build Faster, Design Smarter
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-400"
          >
            Access our premium collection of pre-built components, crafted with
            attention to detail and ready for your next project.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <MotionButton
              to={"/templates"}
              bg="primary"
              label="View Templates"
              icon={ArrowRight}
            />
            {!session && (
              <MotionButton
                to="/signup"
                label="Get Started Free"
                bg="secondary"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Hero Features */}
        <div className="absolute hidden grid-cols-1 gap-8 md:-bottom-2 md:grid md:grid-cols-3">
          {HERO_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="rounded-xl border border-neutral-200 bg-white/80 p-6 shadow-lg backdrop-blur-lg transition-all hover:shadow-xl dark:border-neutral-800 dark:bg-black/80"
              whileHover={{ y: -5 }}
            >
              <div className="mb-3 flex items-center gap-3">
                {index === 0 && <Code className="h-5 w-5 text-blue-500" />}
                {index === 1 && <Zap className="h-5 w-5 text-yellow-500" />}
                {index === 2 && <Rocket className="h-5 w-5 text-purple-500" />}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  {feature.title}
                </h3>
              </div>
              <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
