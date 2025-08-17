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
    <div className="from-background to-background/80 min-h-screen bg-gradient-to-b py-8">
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          label="Templates Library"
          title="Premium UI Templates"
          description="Discover our collection of pre-built templates, crafted with attention to detail and ready for your next project."
          gradientText="Templates"
          textHeight={120}
          mdTextHeight={120}
          lgTextHeight={140}
        />

        {/* View mode toggle with animation */}
        <motion.div
          className="my-8 ml-4 flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className="relative overflow-hidden"
          >
            <Grid className="mr-2 h-4 w-4" />
            Grid
            {viewMode === "grid" && (
              <motion.div
                className="bg-primary absolute right-0 bottom-0 left-0 h-0.5"
                layoutId="viewModeIndicator"
              />
            )}
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className="relative overflow-hidden"
          >
            <List className="mr-2 h-4 w-4" />
            List
            {viewMode === "list" && (
              <motion.div
                className="bg-primary absolute right-0 bottom-0 left-0 h-0.5"
                layoutId="viewModeIndicator"
              />
            )}
          </Button>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          className="bg-card/90 border-border/30 mb-8 rounded-xl border p-6 shadow-md backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <Search
                className={`absolute top-1/2 left-3 -translate-y-1/2 transform ${
                  isSearchFocused ? "text-primary" : "text-muted-foreground"
                } h-4 w-4 transition-colors`}
              />
              <Input
                ref={searchInputRef}
                placeholder="Search templates... (Press '/' to focus)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`pl-10 transition-all duration-300 ${
                  isSearchFocused ? "ring-primary/20 border-primary ring-2" : ""
                }`}
              />
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform transition-colors"
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
              <SelectTrigger className="hover:border-primary/50 transition-all">
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
              <SelectTrigger className="hover:border-primary/50 transition-all">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">
                  <div className="flex items-center">
                    <Download className="text-muted-foreground mr-2 h-4 w-4" />
                    Most Popular
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center">
                    <Star className="text-muted-foreground mr-2 h-4 w-4" />
                    Highest Rated
                  </div>
                </SelectItem>
                <SelectItem value="recent">
                  <div className="flex items-center">
                    <Clock className="text-muted-foreground mr-2 h-4 w-4" />
                    Recently Updated
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="group hover:bg-primary/5 w-full transition-all"
            >
              <Filter className="group-hover:text-primary mr-2 h-4 w-4 transition-colors" />
              More Filters
            </Button>
          </div>

          {/* Filter pills/badges */}
          {(searchQuery ||
            selectedCategory !== "all" ||
            sortBy !== "popular") && (
            <motion.div
              className="mt-4 flex flex-wrap gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="bg-background/80 flex items-center gap-1"
                >
                  <span>Search: {searchQuery}</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-destructive ml-1"
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
                  className="bg-background/80 flex items-center gap-1"
                >
                  <span>Category: {selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="hover:text-destructive ml-1"
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
                  className="bg-background/80 flex items-center gap-1"
                >
                  <span>
                    Sort:{" "}
                    {sortBy === "rating" ? "Highest Rated" : "Recently Updated"}
                  </span>
                  <button
                    onClick={() => setSortBy("popular")}
                    className="hover:text-destructive ml-1"
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
          className="mb-6 flex items-center justify-between px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-medium">
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
                  <Eye className="mr-1 h-3 w-3" />
                  Quick tips
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Press{" "}
                  <kbd className="bg-muted rounded px-2 py-1 text-xs">/</kbd> to
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
              <div className="border-primary/30 border-t-primary mb-4 h-16 w-16 animate-spin rounded-full border-4" />
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
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {sortedTemplates.map((template, idx) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group overflow-hidden rounded-xl shadow-sm transition-all duration-300 ${
                    hoveredTemplate === template.id
                      ? "ring-primary/20 scale-[1.02] shadow-lg ring-1"
                      : "hover:translate-y-[-2px] hover:shadow-md"
                  } bg-card border-border/50 border`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <Link href={`/templates/${template.id}`} className="block">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={template.thumbnail ?? ""}
                        alt={template.name}
                        width={576}
                        height={324}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          className="absolute bottom-4 left-4 flex items-center rounded-full bg-black/70 px-3 py-1.5 text-sm text-white backdrop-blur-sm"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View details
                        </motion.div>
                      </div>

                      {/* Category badge */}
                      <Badge className="absolute top-3 left-3 border-none bg-black/50 text-white backdrop-blur-sm">
                        {template.category}
                      </Badge>
                    </div>
                  </Link>
                  <div className="p-5">
                    <Link href={`/templates/${template.id}`}>
                      <h3 className="hover:text-primary mb-1 text-lg font-semibold transition-colors">
                        {template.name}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
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
                            <span className="relative flex items-center">
                              <Download className="mr-2 h-4 w-4" />
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
                  className={`rounded-xl p-5 shadow-sm transition-all duration-300 ${
                    hoveredTemplate === template.id
                      ? "ring-primary/20 bg-card/95 shadow-lg ring-1"
                      : "hover:bg-card/95 hover:shadow-md"
                  } bg-card/80 border-border/50 border`}
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <div className="flex flex-col">
                    <div className="flex items-start gap-6">
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <Link href={`/templates/${template.id}`}>
                            <h3 className="hover:text-primary mb-1 text-lg font-semibold transition-colors">
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
                          className="bg-muted relative h-32 w-48 overflow-hidden rounded-lg transition-all group-hover:shadow-md"
                        >
                          <Image
                            src={template.thumbnail ?? ""}
                            alt={template.name}
                            width={192}
                            height={144}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Category overlay */}
                          <Badge className="absolute bottom-2 left-2 border-none bg-black/50 text-white backdrop-blur-sm">
                            {template.category}
                          </Badge>
                        </Link>
                        <Link
                          href={`/templates/${template.id}`}
                          className="bg-muted relative h-32 w-48 overflow-hidden rounded-lg transition-all group-hover:shadow-md"
                        >
                          <Image
                            src={template.thumbnail ?? ""}
                            alt={template.name}
                            width={192}
                            height={144}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                        <Link
                          href={`/templates/${template.id}`}
                          className="bg-muted relative h-32 w-48 overflow-hidden rounded-lg transition-all group-hover:shadow-md"
                        >
                          <Image
                            src={template.thumbnail ?? ""}
                            alt={template.name}
                            width={192}
                            height={144}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Link href={`/templates/${template.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-xs"
                        >
                          View details
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                      <div>
                        {isPurchased(template.id) ? (
                          <Button
                            variant="outline"
                            onClick={() => handleDownload(template)}
                            className="group relative w-full overflow-hidden"
                          >
                            <span className="flex items-center">
                              <Download className="mr-2 h-4 w-4" />
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
            className="bg-card/80 border-border/50 rounded-xl border py-16 text-center shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <motion.div
              className="text-muted-foreground mx-auto mb-4 h-16 w-16"
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <Search className="h-full w-full" />
            </motion.div>
            <h3 className="text-primary mb-2 text-lg font-semibold">
              No templates found
            </h3>
            <p className="text-muted-foreground mx-auto mb-6 max-w-md">
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
            className="mt-12 flex justify-center"
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
                className="bg-primary text-primary-foreground h-9 w-9 p-0"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
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
