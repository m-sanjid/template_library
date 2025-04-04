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
import NewsLetter from "@/components/NewsLetter";
import TemplatesPreview from "@/components/TemplatesPreview";

export default function Home() {
	const { data: session } = useSession();


	return (
		<>
			<Navbar />
			<div className="min-h-screen relative max-w-6xl mx-auto">
				<HeroSection session={session} />
				<StatsSection />
				<Features />
				<ComponentPreviewSection />
				<TemplatesPreview />
				<Testimonials />
				<CTA session={session} />
				<NewsLetter/>
			</div>
			<Footer />
		</>
	);
}
