"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { HERO_FEATURES } from "@/lib/config";
import { Session } from "next-auth";
import MotionButton from "./MotionButton";

const HeroSection = ({ session }: { session: Session | null }) => {
	return (
		<section className="relative max-w-7xl overflow-hidden my-8 h-[44rem] mx-auto rounded-t-2xl border border-neutral-700 border-dashed py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neutral-50 to-neutral-300 dark:from-neutral-900 dark:to-neutral-800">
			<div className="absolute inset-0 bg-grid-pattern"></div>
			<div className="max-w-7xl mx-auto my-20">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-black/10 dark:bg-white/10 mb-6">
						<Sparkles className="w-4 h-4 mr-2" />
						<span className="text-sm font-medium">
							New: Custom Template on Request
						</span>
					</div>
					<h1 className="text-4xl sm:text-6xl font-semibold mb-6">
						Build Faster, Design Smarter{" "}
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
						Access our premium collection of pre-built components, crafted with
						attention to detail and ready for your next project.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
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
					</div>
				</motion.div>

				{/* Hero Features */}
				<div className="hidden md:grid absolute md:-bottom-2 grid-cols-1 md:grid-cols-3 gap-8">
					{HERO_FEATURES.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.2 }}
							className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
						>
							<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
