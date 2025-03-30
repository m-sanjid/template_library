import { FEATURES } from "@/lib/config";
import { motion } from "framer-motion";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Fade } from "@/types/types";



const Features = ({ fadeInUp }: { fadeInUp: Fade }) => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="relative max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="px-1 z-10 py-1 mb-6 bg-white/10 border rounded-full w-fit backdrop-blur-3xl flex justify-between items-center gap-3"
				>
					<div className="p-2 bg-white/5 border rounded-full backdrop-blur-2xl">
						Sui
					</div>
					<div className="pr-2 text-sm font-semibold">Features</div>
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-start mb-6 flex justify-between w-full"
				>
					<h2 className="text-xl sm:text-2xl max-w-md font-bold mb-4">
						Everything You Need to Create Amazing Templates
					</h2>
					<p className="text-muted-foreground max-w-md">
						Powerful features that help you create, customize, and manage your
						templates efficiently.
					</p>
				</motion.div>
				<div className="absolute -top-20 flex justify-center items-center -z-10 opacity-50 overflow-hidden bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-black tracking-tight">
					<span className="text-[60px] md:text-[220px] font-extrabold">
						FEATURES
					</span>
				</div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-6"
				>
					<FeatureCard feature={FEATURES[0]} />
					<FeatureCard feature={FEATURES[1]} />
					<div className="grid grid-rows-2 gap-2">
						<FeatureCard2 feature={FEATURES[2]} />
						<FeatureCard2 feature={FEATURES[3]} />
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Features;

const FeatureCard = ({ feature }: { feature: any }) => {
	return (
		<Card className="p-[10px] rounded-3xl bg-black/5 dark:bg-white/5">
			<Card className="h-[24rem] rounded-[16px] overflow-hidden">
				<div className="h-full w-full bg-black/20 dark:bg-white/5"></div>
			</Card>
			<CardContent className="p-4 ">
				<h3 className="text-xl font-semibold">{feature.title}</h3>
				<p className="text-neutral-400">{feature.description}</p>
			</CardContent>
		</Card>
	);
};

const FeatureCard2 = ({ feature }: { feature: any }) => {
	return (
		<Card className="overflow-hidden rounded-3xl">
			<div className="h-[4rem] w-full bg-black/20 rounded-t-lg"></div>
			<CardContent className="flex flex-col justify-center h-full">
				<h3 className="text-xl font-semibold">{feature.title}</h3>
				<p className="text-neutral-400">{feature.description}</p>
			</CardContent>
		</Card>
	);
};
