import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Preview } from "@/components/ui/preview";
import { COMPONENTS } from "@/data/components";
import { ArrowRight, Zap } from "lucide-react";

interface ComponentCardProps {
	title: string;
	description: string;
	price: number;
	discountPrice: number;
	count: number;
	image: string;
	faded?: boolean;
	component?: React.ComponentType<any>;
}

const ComponentCard = ({
	title,
	description,
	price,
	discountPrice,
	count,
	faded,
	component,
}: ComponentCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
			className={`relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-sm border ${faded ? "opacity-50" : ""}`}
		>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-10" />
			<div className="relative z-20 p-6">
				<div className="flex justify-between items-start mb-4">
					<div>
						<h3 className="text-xl font-semibold mb-2">{title}</h3>
						<p className="text-sm text-muted-foreground mb-4">{description}</p>
					</div>
					<Badge
						variant="secondary"
						className="bg-white/10 backdrop-blur-sm flex gap-2"
					>
						<div>{count}</div>
						<div>Variants</div>
					</Badge>
				</div>

				<div className="relative h-48 mb-6 rounded-lg overflow-hidden bg-black/10">
					<div className="absolute inset-0 flex items-center justify-center">
						<Preview component={component} />
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-xl font-bold">${discountPrice}</span>
						<span className="text-sm line-through text-muted-foreground">
							${price}
						</span>
					</div>
					<Button variant="outline" className="group">
						View Details
						<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</div>
		</motion.div>
	);
};

const ComponentsPreviewSection = () => {
	const packs = [
		{
			title: "Hero Sections",
			count: 8,
			price: 18,
			discountPrice: 12,
			description:
				"A collection of modern hero sections with animations and responsive design.",
			image: "/hero.svg",
			component: COMPONENTS.find((c) => c.id === "hero")?.component,
		},
		{
			title: "Logo Clouds",
			count: 3,
			price: 16,
			discountPrice: 10,
			description:
				"Trusted company logos with smooth animations and responsive layouts.",
			image: "/logo-cloud.png",
			component: COMPONENTS.find((c) => c.id === "logo-cloud")?.component,
		},
		{
			title: "Feature Sections",
			count: 4,
			price: 14,
			discountPrice: 9,
			description:
				"Feature section designs with modern UI patterns and animations.",
			image: "/feature.png",
			component: COMPONENTS.find((c) => c.id === "feature")?.component,
		},
		{
			title: "Backgrounds",
			count: 7,
			price: 15,
			discountPrice: 9,
			description:
				"Creative background patterns and gradients for modern websites.",
			image: "/backgrounds.png",
			faded: true,
			component: COMPONENTS.find((c) => c.id === "background")?.component,
		},
		{
			title: "Bento Grids",
			count: 3,
			price: 18,
			discountPrice: 12,
			description: "Modern bento grid layouts with interactive elements.",
			image: "/bento.png",
			component: COMPONENTS.find((c) => c.id === "bento")?.component,
		},
		{
			title: "Blog Content Sections",
			count: 2,
			price: 15,
			discountPrice: 9,
			description: "Blog section layouts with rich typography and spacing.",
			image: "/blog.png",
			faded: true,
			component: COMPONENTS.find((c) => c.id === "blog")?.component,
		},
	];

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
						<Zap className="w-4 h-4" />
					</div>
					<div className="pr-2 text-sm font-semibold">Component Packs</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-16 flex justify-between text-start"
				>
					<h2 className="text-xl sm:text-2xl max-w-md font-bold mb-4">
						Premium Component Packs
					</h2>
					<p className="text-muted-foreground max-w-md">
						A growing collection of building blocks for your website, crafted
						with attention to detail.
					</p>
				</motion.div>

				<div className="absolute -top-20 flex justify-center items-center -z-10 opacity-50 overflow-hidden bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-100 dark:from-neutral-700 dark:via-neutral-800 dark:to-black tracking-tight">
					<span className="text-[50px] md:text-[160px] font-extrabold">
						COMPONENTS
					</span>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{packs.map((pack, index) => (
						<ComponentCard key={index} {...pack} />
					))}
				</div>

				<div className="flex justify-center mt-12">
					<Button
						size="lg"
						className="group bg-black text-white hover:bg-black/90"
					>
						Show More Components
						<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ComponentsPreviewSection;
