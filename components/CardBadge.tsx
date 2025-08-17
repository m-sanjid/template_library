"use client";

import React from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

const CardBadge = ({ label }: { label: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="z-10 mb-6 flex w-fit items-center justify-between gap-3 rounded-full border bg-white/10 px-1 py-1 backdrop-blur-3xl"
    >
      <div className="rounded-full border bg-white/5 p-2 backdrop-blur-2xl">
        {/* TODO: change it to logo */}
        <Zap className="h-4 w-4" />
      </div>
      <div className="pr-2 text-sm font-semibold">{label}</div>
    </motion.div>
  );
};

export default CardBadge;
