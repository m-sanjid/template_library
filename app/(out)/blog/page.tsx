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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative rounded-lg shadow-sm overflow-hidden bg-card border border-border"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="aspect-video relative">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={576}
                        height={324}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ArrowRight className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className=" bg-muted px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {post.author}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
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
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-video relative">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={576}
                    height={324}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="bg-muted px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
              <Search className="w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No blog posts found</h3>
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