import { TESTIMONIALS } from "@/lib/config";
import { motion } from "motion/react";
import React from "react";
import { Fade } from "@/types/types";

const columnVariants = (direction: string) => ({
	animate: {
		y: direction === "up" ? [0, "-50%"] : ["-50%", 0],
		transition: {
			repeat: Infinity,
			repeatType: "loop",
			duration: 25,
			ease: "linear",
		},
	},
});

const Testimonials = ({ fadeInUp }: { fadeInUp: Fade }) => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-7xl mx-auto relative">
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
					<div className="pr-2 text-sm font-semibold">Testimonials</div>
				</motion.div>
				<motion.div
					{...fadeInUp}
					className="text-center mb-6 flex justify-between w-full"
				>
					<h2 className="text-xl sm:text-2xl font-bold mb-4">
						Loved by Creators Worldwide
					</h2>
					<p className="text-muted-foreground">
						See what our users have to say about their experience.
					</p>
				</motion.div>

				<div className="absolute -top-16 flex justify-center items-center -z-10 opacity-50 overflow-hidden bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 via-neutral-200 to-neutral-100 dark:from-neutral-600 dark:via-neutral-800 dark:to-black">
					<span className="text-[50px] md:text-[150px] font-extrabold">
						TESTIMONIALS
					</span>
				</div>
				<div className="realative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 h-[40rem] overflow-hidden border rounded-2xl p-3 bg-black/5 dark:bg-white/5 backdrop-blur-md">
					{["up", "down", "up"].map((direction, index) => (
						<div key={index} className="relative w-full h-full overflow-hidden">
							<motion.div
								className="flex flex-col gap-4 absolute w-full"
								variants={columnVariants(direction)}
								animate="animate"
							>
								{TESTIMONIALS.map((testimonial, i) => (
									<TestimonialCard
										key={`column-${index}-testimonial-${i}`}
										testimonial={testimonial}
									/>
								))}
								{TESTIMONIALS.map((testimonial, i) => (
									<TestimonialCard
										key={`column-${index}-testimonial-duplicate-${i}`}
										testimonial={testimonial}
									/>
								))}
							</motion.div>
						</div>
					))}
					<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b dark:from-neutral-900 to-transparent z-10"></div>
					<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t dark:from-neutral-900 to-transparent z-10"></div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;

const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
	return (
		<div className="bg-black/5 dark:bg-white/5 rounded-xl p-8 flex flex-col justify-between h-64 border">
			<div className="space-y-4">
				<div className="dark:text-muted-foreground">
					<span className="text-2xl">&quote;</span>
				</div>
				<p className="text-muted-foreground text-base">{testimonial.content}</p>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h4 className="font-medium">{testimonial.name}</h4>
					<p className="text-muted-foreground text-sm">{testimonial.role}</p>
				</div>
				<div className="flex items-center justify-end mt-2">
					<div className="bg-black/20 dark:bg-white/20 rounded-md p-2 w-8 h-8 flex items-center justify-center">
						<span className="text-white text-xs">X</span>
					</div>
				</div>
			</div>
		</div>
	);
};
