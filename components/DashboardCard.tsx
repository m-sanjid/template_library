import { motion } from "motion/react";
import { Mail, MessageSquare, Settings } from "lucide-react";

const Card = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-black/80 border border-neutral-800 rounded-xl p-6 shadow-lg text-white"
		>
			{children}
			<h3 className="text-xl font-semibold mt-4">{title}</h3>
			<p className="text-neutral-400 mt-2">{description}</p>
		</motion.div>
	);
};

const Dashboard = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-black min-h-screen">
			{/* Predictive Analytics */}
			<Card
				title="Predictive Analytics"
				description="Harness the power of data to forecast trends."
			>
				<div className="relative h-40 w-full bg-neutral-900 rounded-lg">
					<div className="absolute top-4 left-4 bg-neutral-800 px-3 py-1 text-sm rounded-full">
						Risk: 42%
					</div>
					<div className="absolute bottom-6 left-8 bg-neutral-700 px-3 py-1 text-sm rounded-lg">
						Possible low
					</div>
					<div className="absolute top-16 left-20 bg-neutral-700 px-3 py-1 text-sm rounded-lg">
						Possible high
					</div>
				</div>
			</Card>

			{/* Automated Workflows */}
			<Card
				title="Automated Workflows"
				description="Streamline business processes."
			>
				<div className="flex flex-col gap-4">
					<motion.button
						className="bg-neutral-800 flex items-center gap-2 px-4 py-2 rounded-lg"
						whileHover={{ scale: 1.05 }}
					>
						<Settings size={18} /> Trigger
					</motion.button>
					<motion.button
						className="bg-neutral-800 flex items-center gap-2 px-4 py-2 rounded-lg"
						whileHover={{ scale: 1.05 }}
					>
						<MessageSquare size={18} /> Prompts
					</motion.button>
					<motion.button
						className="bg-neutral-800 flex items-center gap-2 px-4 py-2 rounded-lg"
						whileHover={{ scale: 1.05 }}
					>
						<Mail size={18} /> Send Email
					</motion.button>
				</div>
			</Card>

			{/* NLP Analysis */}
			<Card
				title="Natural Language Processing"
				description="Enhance customer interactions with AI."
			>
				<div className="relative h-40 w-full bg-neutral-900 rounded-lg">
					<div className="absolute top-4 left-4 bg-neutral-800 px-3 py-1 text-sm rounded-full">
						August 2024
					</div>
					<div className="absolute bottom-6 right-8 bg-neutral-800 px-3 py-1 text-sm rounded-full">
						5.6%
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Dashboard;
