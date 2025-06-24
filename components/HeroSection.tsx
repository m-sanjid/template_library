"use client";

import { ArrowRight, Sparkles, Code, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";
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
		<section className="relative max-w-7xl overflow-hidden my-8 h-[44rem] mx-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 border-dashed py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
			<div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5"></div>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50"></div>
			
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="max-w-7xl mx-auto my-20 relative z-10"
			>
				<motion.div
					variants={itemVariants}
					className="text-center"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="inline-flex items-center px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800 mb-6"
					>
						<Sparkles className="w-4 h-4 mr-2 text-blue-500" />
						<span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
							New: Custom Template on Request
						</span>
					</motion.div>

					<motion.h1
						variants={itemVariants}
						className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400"
					>
						Build Faster, Design Smarter
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed"
					>
						Access our premium collection of pre-built components, crafted with
						attention to detail and ready for your next project.
					</motion.p>

					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row justify-center gap-4"
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
				<div className="hidden md:grid absolute md:-bottom-2 grid-cols-1 md:grid-cols-3 gap-8">
					{HERO_FEATURES.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
							className="bg-white/80 dark:bg-black/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-neutral-200 dark:border-neutral-800"
							whileHover={{ y: -5 }}
						>
							<div className="flex items-center gap-3 mb-3">
								{index === 0 && <Code className="w-5 h-5 text-blue-500" />}
								{index === 1 && <Zap className="w-5 h-5 text-yellow-500" />}
								{index === 2 && <Rocket className="w-5 h-5 text-purple-500" />}
								<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{feature.title}</h3>
							</div>
							<p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
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
