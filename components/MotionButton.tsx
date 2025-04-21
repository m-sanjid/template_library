"use client";

import { LucideProps } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const MotionButton = ({
	label,
	to,
	bg,
	icon: IconComponent,
}: {
	label: string;
	to: string;
	bg: "primary" | "secondary";
	icon?: React.ComponentType<LucideProps>;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 1 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1, duration: 0.3 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
		>
			<Link
				href={to}
				className={`px-6 py-3 shadow-2xl z-20 rounded-full flex gap-2 items-center ${bg === "primary" ? "dark:bg-white dark:text-black bg-neutral-800 text-neutral-200 dark:hover:bg-neutral-600" : "bg-white ring-1 ring-neutral-500 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"} transition-colors`}
			>
				{label}
				{IconComponent && <IconComponent size={20} />}
			</Link>
		</motion.div>
	);
};

export default MotionButton;
