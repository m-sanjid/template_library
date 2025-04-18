import React from 'react';
import { motion } from 'motion/react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Stars Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[2px] h-[2px] bg-white opacity-50 rounded-full absolute"
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
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Arriving Shortly!
      </motion.h1>

      <p className="text-gray-400 mb-8">Get our latest updates and news by joining our newsletter.</p>

      {/* Subscribe Section */}
      <div className="flex items-center space-x-2">
        <input
          type="email"
          placeholder="pixkit@framer.com"
          className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">Subscribe</button>
      </div>

      <p className="text-gray-500 text-sm mt-4">By signing up you agree to our <span className="underline cursor-pointer">privacy policy</span>.</p>

      {/* Navigation Link */}
      <a href="#" className="mt-6 text-gray-400 hover:text-white">Back to homepage →</a>

      {/* Footer Section */}
      <div className="mt-16 flex space-x-8">
        <div className="text-center">
          <p className="text-xl font-medium">Visit us</p>
          <p className="text-gray-500">8am to 6pm, Monday to Friday</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium">Location</p>
          <p className="text-gray-500">14 Rue Saint Paul, Paris</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-medium">Email</p>
          <p className="text-gray-500">email@website.com</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
