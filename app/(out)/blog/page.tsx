"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BLOG_CATEGORIES } from "@/lib/config";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
// Mock data - replace with actual API call
const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Tips for Creating Professional Templates",
    slug: "10-tips-professional-templates",
    excerpt:
      "Learn how to create professional templates that stand out and meet your clients' needs.",
    category: "Design Tips",
    author: "John Doe",
    date: "2024-03-20",
    readTime: "5 min read",
    thumbnail: "/blog/template-tips.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of Document Templates",
    slug: "future-document-templates",
    excerpt:
      "Discover the latest trends and technologies shaping the future of document templates.",
    category: "Product Updates",
    author: "Jane Smith",
    date: "2024-03-19",
    readTime: "8 min read",
    thumbnail: "/blog/future-templates.jpg",
    featured: true,
  },
  // Add more blog posts as needed
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut([
    {
      key: "/",
      callback: () => {
        searchInputRef.current?.focus();
      },
    },
  ]);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = BLOG_POSTS.filter((post) => post.featured);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          label="Blog"
          title="Template Library Blog"
          description="Discover tips, tutorials, and insights about creating and using professional templates"
          gradientText="BLOG"
          textHeight={240}
        />

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="my-20">
            <h2 className="mb-6 text-2xl font-bold">Featured Posts</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-card border-border relative overflow-hidden rounded-lg border shadow-sm"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-video">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={576}
                        height={324}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <ArrowRight className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                        <span className="bg-muted rounded px-2 py-1">
                          {post.category}
                        </span>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {post.author}
                        </div>
                      </div>
                      <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
            <Input
              ref={searchInputRef}
              placeholder="Search blog posts... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {BLOG_CATEGORIES.map((category) => (
              <Button
                key={category.slug}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-card overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={576}
                    height={324}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-muted-foreground mb-3 flex items-center gap-4 text-sm">
                    <span className="bg-muted rounded px-2 py-1">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="group-hover:text-primary mb-2 text-lg font-semibold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="text-muted-foreground flex items-center text-sm">
                    <User className="mr-1 h-4 w-4" />
                    {post.author}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-muted-foreground mx-auto mb-4 h-16 w-16">
              <Search className="h-full w-full" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No blog posts found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or category filters.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
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
