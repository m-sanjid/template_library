
import { Button } from "./ui/button";
import React from "react";
import Link from "next/link";
import { Session } from "next-auth";
import SectionHeader from "./SectionHeader";
const CTA = ({ session }: { session: Session | null }) => {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r">
			<div className="max-w-7xl mx-auto text-center">
				<SectionHeader label="Ready to Get Started" title="Ready to Get Started" description="Join thousands of users who are already creating amazing templates with our platform." gradientText="START NOW" mdTextHeight={180} />
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Button
							size="lg"
							className="shadow-lg hover:shadow-xl transition-all rounded-full"
							asChild
						>
							<Link href={session ? "/templates" : "/register"}>
								{session ? "Browse Templates" : "Start Creating for Free"}
							</Link>
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="border-white rounded-full"
							asChild
						>
							<Link href="/pricing">View Pricing</Link>
						</Button>
					</div>
			</div>
		</section>
	);
};

export default CTA;
