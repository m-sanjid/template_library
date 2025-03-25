"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { TEMPLATE_PREVIEW_FEATURES } from "@/lib/config";
import {
  Download,
  Eye,
  ShoppingCart,
  Star,
  Clock,
  Settings,
  Monitor,
  Tablet,
  Smartphone,
  Check,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with actual API call
const template = {
  id: 1,
  name: "Professional Resume",
  category: "Personal",
  subcategory: "Resumes",
  description: "A clean and modern resume template perfect for professionals. This template includes multiple sections for your work experience, skills, education, and more. Easily customizable to match your personal brand.",
  price: 29,
  rating: 4.8,
  downloads: 1234,
  lastUpdated: "2024-03-20",
  features: [
    "Multiple color schemes",
    "Print-ready format",
    "ATS-friendly design",
    "Custom sections",
    "Font customization",
    "Export to PDF/Word",
  ],
  screenshots: {
    desktop: "/templates/resume-desktop.jpg",
    tablet: "/templates/resume-tablet.jpg",
    mobile: "/templates/resume-mobile.jpg",
  },
  demoUrl: "https://demo.templatelibrary.com/resume",
};

export default function TemplateDetailPage({ params }: { params: { id: string } }) {
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      name: template.name,
      description: template.description,
      price: template.price,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {template.name}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                {template.rating} ({template.downloads} downloads)
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Updated {template.lastUpdated}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Live Preview
            </Button>
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart - ${template.price}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Preview</h2>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activeView === "desktop" ? "default" : "outline"}
                    onClick={() => setActiveView("desktop")}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={activeView === "tablet" ? "default" : "outline"}
                    onClick={() => setActiveView("tablet")}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={activeView === "mobile" ? "default" : "outline"}
                    onClick={() => setActiveView("mobile")}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={template.screenshots[activeView]}
                  alt={`${template.name} - ${activeView} view`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Features Tabs */}
            <div className="mt-8">
              <Tabs defaultValue="features">
                <TabsList className="w-full">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="bg-white rounded-lg shadow-sm p-6">
                  <ul className="grid grid-cols-2 gap-4">
                    {template.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="bg-white rounded-lg shadow-sm p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">File Formats</h3>
                      <p>PDF, DOCX, HTML</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Dimensions</h3>
                      <p>A4, US Letter</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Required Software</h3>
                      <p>Adobe Reader, Microsoft Word, or any modern web browser</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="compatibility" className="bg-white rounded-lg shadow-sm p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Operating Systems</h3>
                      <p>Windows, macOS, Linux</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Browsers</h3>
                      <p>Chrome, Firefox, Safari, Edge</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Mobile Devices</h3>
                      <p>Fully responsive design for all screen sizes</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <p className="text-gray-600">{template.description}</p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Demo
                </Button>
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Support</h2>
              <ul className="space-y-3 text-sm">
                <li>✓ 6 months technical support</li>
                <li>✓ Documentation included</li>
                <li>✓ Future updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-6xl mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Live Preview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewOpen(false)}
              >
                ✕
              </Button>
            </div>
            <div className="p-4">
              <iframe
                src={template.demoUrl}
                className="w-full h-[80vh] rounded-lg border"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
