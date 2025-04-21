import React from "react";
import { motion } from "motion/react";
import { BanIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
//TODO: add images and change texts

const StatsSection = () => {
	return (
		<div className="relative max-w-5xl mx-auto my-20">
			<SectionHeader label="Benifits" title="Everything You Need to Create Amazing Templates" description="Powerful features that help you create, customize, and manage your templates efficiently." gradientText="BENIFITS" textHeight={220} />
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
