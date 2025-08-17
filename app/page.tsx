"use client";

import React from "react";
import { useSession } from "next-auth/react";
import StatsSection from "@/components/StatsSection";
import HeroSection from "@/components/HeroSection";
import ComponentPreviewSection from "@/components/ComponentsPreviewSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import NewsLetter from "@/components/NewsLetter";
import TemplatesPreview from "@/components/TemplatesPreview";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <div className="relative mx-auto min-h-screen max-w-6xl overflow-hidden">
        <HeroSection session={session} />
        <StatsSection />
        <Features />
        <ComponentPreviewSection />
        <TemplatesPreview />
        <Testimonials />
        <CTA session={session} />
        <NewsLetter />
      </div>
    </>
  );
}
