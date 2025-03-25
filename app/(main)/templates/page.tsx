"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEMPLATE_CATEGORIES } from "@/lib/config";
import {
  Grid,
  List,
  Search,
  Filter,
  Download,
  Star,
  Clock,
  ThumbsUp,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";


// Mock data - replace with actual API call
const TEMPLATES = [
  {
    id: 1,
    name: "Professional Resume",
    category: "Personal",
    subcategory: "Resumes",
    description: "A clean and modern resume template perfect for professionals.",
    price: 29,
    rating: 4.8,
    downloads: 1234,
    lastUpdated: "2024-03-20",
    thumbnail: "/templates/resume.jpg",
    isPurchased: false,
  },
  {
    id: 2,
    name: "Business Proposal",
    category: "Business",
    subcategory: "Proposals",
    description: "Comprehensive business proposal template with modern design.",
    price: 49,
    rating: 4.9,
    downloads: 856,
    lastUpdated: "2024-03-19",
    thumbnail: "/templates/proposal.jpg",
    isPurchased: true,
  },
  // Add more templates as needed
];

export default function TemplatesPage() {
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut([
    {
      key: "/",
      callback: () => {
        searchInputRef.current?.focus();
      },
    },
  ]);

  const filteredTemplates = TEMPLATES.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "recent":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const handleAddToCart = (template: any) => {
    addToCart({
      name: template.name,
      description: template.description,
      price: template.price,
      quantity: 1,
    });
    toast({
      title: "Added to cart",
      description: `${template.name} has been added to your cart.`,
    });
  };

  const handleDownload = (template: any) => {
    // Implement download logic here
    toast({
      title: "Download started",
      description: `${template.name} is being downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
            <p className="mt-2 text-gray-600">
              Browse and download professional templates for any purpose
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                ref={searchInputRef}
                placeholder="Search templates... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {TEMPLATE_CATEGORIES.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Templates Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/templates/${template.id}`} className="block">
                    <div className="aspect-video bg-gray-100 relative">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/templates/${template.id}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {template.rating}
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-1" />
                        {template.downloads}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${template.price}</span>
                      <div className="flex gap-2">
                        {template.isPurchased ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(template)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(template)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {sortedTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <Link
                      href={`/templates/${template.id}`}
                      className="w-48 h-32 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/templates/${template.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-blue-600 transition-colors">
                          {template.name}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400" />
                          {template.rating}
                        </div>
                        <div className="flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          {template.downloads}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Updated {template.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-semibold">${template.price}</span>
                      {template.isPurchased ? (
                        <Button
                          variant="outline"
                          onClick={() => handleDownload(template)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      ) : (
                        <Button onClick={() => handleAddToCart(template)}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {sortedTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <Search className="w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("popular");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
