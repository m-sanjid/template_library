"use client";

import { useState, useRef, useEffect } from "react";
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
import { TEMPLATE_CATEGORIES, TemplateItemType } from "@/lib/config";
import {
  Grid,
  List,
  Search,
  Filter,
  Download,
  Star,
  Clock,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { useCart } from "@/context/CartContext";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import SectionHeader from "@/components/SectionHeader";
import { usePurchases } from "@/hooks/use-purchases";
import { toast } from "sonner";
import AddToCart from "@/components/AddToCart";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TemplatesPage() {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [templates, setTemplates] = useState<TemplateItemType[]>([]);
  const { isPurchased } = usePurchases();
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load templates", {
          description: "Please try again later or refresh the page.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useKeyboardShortcut([
    {
      key: "/",
      callback: () => {
        searchInputRef.current?.focus();
      },
    },
  ]);

  const filteredTemplates = templates.filter((template: TemplateItemType) => {
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
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      default:
        return 0;
    }
  });

  const handleAddToCart = (template: TemplateItemType) => {
    addToCart({
      name: template.name,
      description: template.description,
      price: template.price,
      quantity: 1,
    });

    toast.success("Added to cart", {
      description: `${template.name} has been added to your cart.`,
      action: {
        label: "View Cart",
        onClick: () => {
          router.push("/cart");
        },
      },
    });
  };

  const handleDownload = (template: TemplateItemType) => {
    toast.success("Download started", {
      description: `${template.name} is being downloaded.`,
    });
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-background to-background/80">
      <div className="container max-w-7xl mx-auto px-4 py-20">
        <SectionHeader
          label="Templates Library"
          title="Premium UI Templates"
          description="Discover our collection of pre-built templates, crafted with attention to detail and ready for your next project."
          gradientText="Templates"
          textHeight={60}
          mdTextHeight={240}
        />

        {/* View mode toggle with animation */}
        <motion.div
          className="flex gap-4 my-8 ml-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="relative overflow-hidden"
          >
            <Grid className="w-4 h-4 mr-2" />
            Grid
            {viewMode === "grid" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="viewModeIndicator"
              />
            )}
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className="relative overflow-hidden"
          >
            <List className="w-4 h-4 mr-2" />
            List
            {viewMode === "list" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="viewModeIndicator"
              />
            )}
          </Button>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          className="rounded-xl shadow-md p-6 mb-8 bg-card/90 backdrop-blur-sm border border-border/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  isSearchFocused ? "text-primary" : "text-muted-foreground"
                } w-4 h-4 transition-colors`}
              />
              <Input
                ref={searchInputRef}
                placeholder="Search templates... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pl-10 transition-all duration-300 ${
                  isSearchFocused ? "ring-2 ring-primary/20 border-primary" : ""
                }`}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  <span className="sr-only">Clear search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
              )}
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="transition-all hover:border-primary/50">
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
              <SelectTrigger className="transition-all hover:border-primary/50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2 text-muted-foreground" />
                    Most Popular
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-muted-foreground" />
                    Highest Rated
                  </div>
                </SelectItem>
                <SelectItem value="recent">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    Recently Updated
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="w-full group transition-all hover:bg-primary/5"
            >
              <Filter className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              More Filters
            </Button>
          </div>

          {/* Filter pills/badges */}
          {(searchQuery ||
            selectedCategory !== "all" ||
            sortBy !== "popular") && (
            <motion.div
              className="flex flex-wrap gap-2 mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background/80"
                >
                  <span>Search: {searchQuery}</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-destructive"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span className="sr-only">Remove search filter</span>
                  </button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background/80"
                >
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:text-destructive"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span className="sr-only">Remove category filter</span>
                  </button>
                </Badge>
              )}
              {sortBy !== "popular" && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background/80"
                >
                  <span>
                    Sort:{" "}
                    {sortBy === "rating" ? "Highest Rated" : "Recently Updated"}
                  </span>
                  <button
                    onClick={() => setSortBy("popular")}
                    className="ml-1 hover:text-destructive"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span className="sr-only">Remove sort filter</span>
                  </button>
                </Badge>
              )}

              {(searchQuery ||
                selectedCategory !== "all" ||
                sortBy !== "popular") && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSortBy("popular");
                  }}
                  className="text-xs"
                >
                  Clear all
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results summary */}
        <motion.div
          className="flex justify-between items-center mb-6 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {sortedTemplates.length}
            </span>{" "}
            templates
          </p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className="bg-primary/5 hover:bg-primary/10 cursor-help transition-colors"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Quick tips
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Press{" "}
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">/</kbd> to
                  quickly search templates
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground">Loading templates...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Templates Grid/List with staggered animations */}
        <AnimatePresence mode="wait">
          {!isLoading && viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {sortedTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${
                    hoveredTemplate === template.id
                      ? "shadow-lg ring-1 ring-primary/20 scale-[1.02]"
                      : "hover:shadow-md hover:translate-y-[-2px]"
                  } bg-card border border-border/50`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <Link href={`/templates/${template.id}`} className="block">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={template.thumbnail ?? ""}
                        alt={template.name}
                        width={576}
                        height={324}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm flex items-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View details
                        </motion.div>
                      </div>

                      {/* Category badge */}
                      <Badge className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white border-none">
                        {template.category}
                      </Badge>
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/templates/${template.id}`}>
                      <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                        {template.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">${template.price}</span>
                      <div className="flex gap-2">
                        {isPurchased(template.id) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(template)}
                            className="group relative overflow-hidden"
                          >
                            <span className="flex items-center relative">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </span>
                          </Button>
                        ) : (
                          <AddToCart
                            handleAddToCart={() => handleAddToCart(template)}
                            price={template.price}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : !isLoading ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {sortedTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`rounded-xl shadow-sm p-5 transition-all duration-300 ${
                    hoveredTemplate === template.id
                      ? "shadow-lg ring-1 ring-primary/20 bg-card/95"
                      : "hover:shadow-md hover:bg-card/95"
                  } bg-card/80 border border-border/50`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <div className="flex flex-col">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/templates/${template.id}`}>
                            <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                              {template.name}
                            </h3>
                          </Link>
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {template.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <Link
                          href={`/templates/${template.id}`}
                          className="w-48 h-32 bg-muted rounded-lg overflow-hidden relative group-hover:shadow-md transition-all"
                        >
                          <Image
                            src={template.thumbnail ?? ""}
                            alt={template.name}
                            width={192}
                            height={144}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Category overlay */}
                          <Badge className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white border-none">
                            {template.category}
                          </Badge>
                        </Link>
                        <Link
                          href={`/templates/${template.id}`}
                          className="w-48 h-32 bg-muted rounded-lg overflow-hidden relative group-hover:shadow-md transition-all"
                        >
                          <Image
                            src={template.thumbnail ?? ""}
                            alt={template.name}
                            width={192}
                            height={144}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                        <Link
                          href={`/templates/${template.id}`}
                          className="w-48 h-32 bg-muted rounded-lg overflow-hidden relative group-hover:shadow-md transition-all"
                        >
                          <Image
                            src={template.thumbnail ?? ""}
                            alt={template.name}
                            width={192}
                            height={144}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Link href={`/templates/${template.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs w-full"
                        >
                          View details
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                      </Link>
                      <div>
                        {isPurchased(template.id) ? (
                          <Button
                            variant="outline"
                            onClick={() => handleDownload(template)}
                            className="group relative overflow-hidden w-full"
                          >
                            <span className="flex items-center">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </span>
                          </Button>
                        ) : (
                          <AddToCart
                            handleAddToCart={() => handleAddToCart(template)}
                            price={template.price}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Empty State with animation */}
        {!isLoading && sortedTemplates.length === 0 && (
          <motion.div
            className="text-center py-16 rounded-xl bg-card/80 border border-border/50 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 text-muted-foreground"
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Search className="w-full h-full" />
            </motion.div>
            <h3 className="text-lg font-semibold text-primary mb-2">
              No templates found
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <Button
              variant="default"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSortBy("popular");
              }}
              className="px-6"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Results pagination */}
        {!isLoading && sortedTemplates.length > 0 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-9 h-9 p-0 bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="w-9 h-9 p-0">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
