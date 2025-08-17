import React from "react";
import { motion } from "motion/react";

const ComingSoon = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black to-neutral-900 text-white">
      {/* Stars Background Effect */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white opacity-50"
            animate={{
              y: [0, 20, -20, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.h1
        className="mb-4 text-5xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Arriving Shortly!
      </motion.h1>

      <p className="mb-8 text-neutral-400">
        Get our latest updates and news by joining our newsletter.
      </p>

      {/* Subscribe Section */}
      <div className="flex items-center space-x-2">
        <input
          type="email"
          placeholder="pixkit@framer.com"
          className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white focus:ring-2 focus:ring-neutral-600 focus:outline-none"
        />
        <button className="rounded-lg bg-white px-4 py-2 font-medium text-black">
          Subscribe
        </button>
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        By signing up you agree to our{" "}
        <span className="cursor-pointer underline">privacy policy</span>.
      </p>

      {/* Navigation Link */}
      <a href="#" className="mt-6 text-neutral-400 hover:text-white">
        Back to homepage →
      </a>

      {/* Footer Section */}
      <div className="mt-16 flex space-x-8">
        <div className="text-center">
          <p className="text-xl font-medium">Visit us</p>
          <p className="text-neutral-500">8am to 6pm, Monday to Friday</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium">Location</p>
          <p className="text-neutral-500">14 Rue Saint Paul, Paris</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium">Email</p>
          <p className="text-neutral-500">email@website.com</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
