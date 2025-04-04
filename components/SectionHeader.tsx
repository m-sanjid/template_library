import React from 'react'
import CardBadge from './CardBadge'
import { motion } from 'motion/react'

const SectionHeader = ({ label, title, description, gradientText, textHeight=150 }: { label: string, title: string, description: string, gradientText: string, textHeight?: number }) => {
    return (
        <div className='relative'>
            <CardBadge label={label} />
            <motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-16 flex justify-between text-start"
				>
                <div className='text-2xl font-bold'>{title}</div>
                <div className='text-muted-foreground'>{description}</div>
            </motion.div>
            <div className="absolute -top-18 flex justify-center items-center -z-10 opacity-50 overflow-hidden bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-black tracking-tight">
                <span className={`text-[50px] uppercase md:text-[${textHeight}px] font-extrabold`}>
                    {gradientText}
                </span>
            </div>
        </div>
    )
}

export default SectionHeader