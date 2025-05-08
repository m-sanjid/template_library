import React from 'react';
import { motion } from 'motion/react';
import CardBadge from './CardBadge';

interface SectionHeaderProps {
  label: string;
  title: string;
  description: string;
  gradientText: string;
  textHeight?: number;
  smTextHeight?: number;
  mdTextHeight?: number;
  lgTextHeight?: number;
}

const SectionHeader = ({
  label,
  title,
  description,
  gradientText,
  textHeight = 80,
  smTextHeight = 100,
  mdTextHeight = 140,
  lgTextHeight = 200
}: SectionHeaderProps) => {
  return (
    <div className="relative">
      <CardBadge label={label} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 flex justify-between text-start"
      >
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-muted-foreground">{description}</div>
      </motion.div>
      <div className="absolute -top-4 flex justify-center items-center -z-10 opacity-50 overflow-hidden bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-black tracking-tight">
        <span className="uppercase font-extrabold block sm:hidden" style={{ fontSize: `${textHeight}px` }}>
          {gradientText}
        </span>
        <span className="uppercase font-extrabold hidden sm:block md:hidden" style={{ fontSize: `${smTextHeight}px` }}>
          {gradientText} 
        </span>
        <span className="uppercase font-black text-8xl hidden md:block lg:hidden" style={{ fontSize: `${mdTextHeight}px` }}>
          {gradientText}
        </span>
        <span className="uppercase font-black text-8xl hidden lg:block" style={{ fontSize: `${lgTextHeight}px` }}>
          {gradientText}
        </span>
      </div>
    </div>
  );
};

export default SectionHeader;