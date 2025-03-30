import React from "react";
import { motion } from "motion/react";
import { BanIcon } from "lucide-react";

//TODO: add images and change texts

const StatsSection = () => {
	return (
		<div className="relative max-w-5xl mx-auto">
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
				<div className="pr-2 text-sm font-semibold">Benifits</div>
			</motion.div>
			<motion.div className="text-start mb-10 grid grid-cols-1 md:grid-cols-3 gap-20 w-full">
				<div className="col-span-1">
					<h2 className="text-xl sm:text-2xl max-w-md font-bold mb-4">
						Everything You Need to Create Amazing Templates
					</h2>
					<p className="text-muted-foreground max-w-md">
						Powerful features that help you create, customize, and manage your
						templates efficiently.
					</p>
				</div>
				<div className="col-span-2 p-2 border rounded-lg">
					<div className="w-full border rounded-lg p-40 h-full bg-white/10 backdrop-blur-2xl" />
				</div>
			</motion.div>
			<div className="absolute -top-20 flex justify-center items-center -z-10 opacity-50 overflow-hidden bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-black tracking-tight">
				<span className="text-[60px] md:text-[220px] font-extrabold">
					BENIFITS
				</span>
			</div>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-6"
			>
				<StatsCard
					title="Wide Range of Templates"
					description="wide range of templates to choose from"
				/>
				<StatsCard
					title="Easy to Use"
					description="Easy to use templates with a user-friendly interface"
				/>
				<StatsCard
					title="Customizable"
					description="Customizable templates to meet your needs"
				/>
			</motion.div>
		</div>
	);
};

export default StatsSection;

const StatsCard = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	return (
		<div className="bg-gradient-to-b from-white/5 via-black/5 to-white/5 backdrop-blur-sm border rounded-lg p-4 flex flex-col justify-between">
			<div className="p-3 bg-white/10 w-fit rounded-md">
				<BanIcon />
			</div>
			<div className="px-2 mt-10">
				<div className="font-semibold text-sm">{title}</div>
				<div className="text-sm text-muted-foreground">{description}</div>
			</div>
		</div>
	);
};
