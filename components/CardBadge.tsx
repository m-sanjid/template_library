"use client"

import React from 'react'
import { motion } from 'motion/react'
import { Zap } from 'lucide-react'

const CardBadge = ({ label }: { label: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="px-1 z-10 py-1 mb-6 bg-white/10 border rounded-full w-fit backdrop-blur-3xl flex justify-between items-center gap-3"
        >
            <div className="p-2 bg-white/5 border rounded-full backdrop-blur-2xl">
            {/* TODO: change it to logo */}
                <Zap className="w-4 h-4" />
            </div>
            <div className="pr-2 text-sm font-semibold">{label}</div>
        </motion.div>
    )
}

export default CardBadge