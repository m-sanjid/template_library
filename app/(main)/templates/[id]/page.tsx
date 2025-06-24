"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import {
  Download,
  Eye,
  ShoppingCart,
  Star,
  Clock,
  Monitor,
  Tablet,
  Smartphone,
  Check,
  Heart,
  Share2,
  Bookmark,
  ArrowLeft,
  ExternalLink,
  Code,
  Palette,
  Layout,
  FileText,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Mock data - replace with actual API call
const template = {
  id: 1,
  name: "Professional Resume",
  category: "Personal",
  subcategory: "Resumes",
  description:
    "A clean and modern resume template perfect for professionals. This template includes multiple sections for your work experience, skills, education, and more. Easily customizable to match your personal brand.",
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
  tags: ["Resume", "Professional", "Modern", "ATS-Friendly"],
  specifications: {
    formats: ["PDF", "DOCX", "HTML"],
    dimensions: ["A4", "US Letter"],
    software: ["Adobe Reader", "Microsoft Word", "Web Browser"],
  },
  compatibility: {
    browsers: ["Chrome", "Firefox", "Safari", "Edge"],
    devices: ["Desktop", "Tablet", "Mobile"],
  },
};

export default function TemplateDetailPage() {
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
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
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-8">
          <div>
            <Link href="/templates">
              <Button variant="ghost" className="mb-4 gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Button>
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{template.category}</Badge>
              <Badge variant="outline">{template.subcategory}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{template.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Bookmark className="w-4 h-4" />
            </Button>
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
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <div className="absolute inset-0 grid grid-cols-3 gap-1 p-1">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg" />
                  <div className="bg-gray-300 dark:bg-gray-700 rounded-lg" />
                  <div className="bg-gray-400 dark:bg-gray-600 rounded-lg" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      variant={activeView === "desktop" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveView("desktop")}
                    >
                      <Monitor className="w-4 h-4 mr-2" />
                      Desktop
                    </Button>
                    <Button
                      variant={activeView === "tablet" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveView("tablet")}
                    >
                      <Tablet className="w-4 h-4 mr-2" />
                      Tablet
                    </Button>
                    <Button
                      variant={activeView === "mobile" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveView("mobile")}
                    >
                      <Smartphone className="w-4 h-4 mr-2" />
                      Mobile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-8">
              <Tabs defaultValue="features">
                <TabsList className="w-full">
                  <TabsTrigger value="features" className="gap-2">
                    <Layout className="w-4 h-4" />
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="specifications" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="compatibility" className="gap-2">
                    <Code className="w-4 h-4" />
                    Compatibility
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="features"
                  className="rounded-lg shadow-sm p-6"
                >
                  <ul className="grid grid-cols-2 gap-4">
                    {template.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent
                  value="specifications"
                  className="rounded-lg shadow-sm p-6"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">File Formats</h3>
                      <div className="flex flex-wrap gap-2">
                        {template.specifications.formats.map((format) => (
                          <Badge key={format} variant="secondary">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Dimensions</h3>
                      <div className="flex flex-wrap gap-2">
                        {template.specifications.dimensions.map((dim) => (
                          <Badge key={dim} variant="secondary">
                            {dim}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Required Software</h3>
                      <div className="flex flex-wrap gap-2">
                        {template.specifications.software.map((software) => (
                          <Badge key={software} variant="secondary">
                            {software}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="compatibility"
                  className="rounded-lg shadow-sm p-6"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Supported Browsers</h3>
                      <div className="flex flex-wrap gap-2">
                        {template.compatibility.browsers.map((browser) => (
                          <Badge key={browser} variant="secondary">
                            {browser}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Device Support</h3>
                      <div className="flex flex-wrap gap-2">
                        {template.compatibility.devices.map((device) => (
                          <Badge key={device} variant="secondary">
                            {device}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Template Tags</h3>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview Template
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Palette className="w-4 h-4" />
                  Customize Design
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Demo
                </Button>
                <Button className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to help you with any questions about
                this template.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="rounded-lg w-full max-w-6xl mx-4">
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
