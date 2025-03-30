"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import StatsSection from "@/components/StatsSection";
import HeroSection from "@/components/HeroSection";
import ComponentPreviewSection from "@/components/ComponentsPreviewSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
	const { data: session } = useSession();

	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.5 },
	};

	return (
		<div className="min-h-screen relative max-w-6xl mx-auto">
			<Navbar />
			<HeroSection session={session} />
			<StatsSection />
			<Features fadeInUp={fadeInUp} />
			<ComponentPreviewSection />
			<CategoriesSection fadeInUp={fadeInUp} />
			<Testimonials fadeInUp={fadeInUp} />
			<CTA session={session} />
			<Footer />
		</div>
	);
}
