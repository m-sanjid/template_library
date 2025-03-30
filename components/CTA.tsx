import { motion } from "motion/react";
import { Button } from "./ui/button";
import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
const CTA = ({ session }: { session: Session | null }) => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r">
			<div className="max-w-7xl mx-auto text-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
						Ready to Get Started?
					</h2>
					<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
						Join thousands of users who are already creating amazing templates
						with our platform.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Button
							size="lg"
							className="bg-white text-black hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
							asChild
						>
							<Link href={session ? "/templates" : "/register"}>
								{session ? "Browse Templates" : "Start Creating for Free"}
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="text-white border-white hover:bg-white/10"
							asChild
						>
							<Link href="/pricing">View Pricing</Link>
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default CTA;
