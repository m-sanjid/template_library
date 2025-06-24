"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import BgButton from "@/components/BgButton";
import {
  IconBrandX,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconShare,
} from "@tabler/icons-react";
import Image from "next/image";

// Mock data - replace with actual API call
const post = {
  title: "10 Tips for Creating Professional Templates",
  slug: "10-tips-professional-templates",
  content: `
    <h2>Introduction</h2>
    <p>Creating professional templates requires attention to detail and understanding of user needs. Here are 10 essential tips to help you create better templates.</p>

    <h3>1. Start with User Research</h3>
    <p>Understanding your target audience is crucial. Research their needs, preferences, and pain points before starting the design process.</p>

    <h3>2. Keep it Simple</h3>
    <p>Avoid cluttering your templates with unnecessary elements. A clean, minimalist design often works best for professional documents.</p>

    <h3>3. Use Consistent Styling</h3>
    <p>Maintain consistency in fonts, colors, and spacing throughout your template. This creates a cohesive and professional look.</p>

    <!-- Add more content sections -->
  `,
  category: "Design Tips",
  author: {
    name: "John Doe",
    avatar: "/authors/john-doe.jpg",
    bio: "Senior Template Designer with 10+ years of experience in creating professional documents and presentations.",
  },
  date: "2024-03-20",
  readTime: "5 min read",
  thumbnail: "/blog/template-tips.jpg",
};

// Mock related posts
const relatedPosts = [
  {
    id: 2,
    title: "The Future of Document Templates",
    slug: "future-document-templates",
    excerpt:
      "Discover the latest trends and technologies shaping the future of document templates.",
    category: "Product Updates",
    author: "Jane Smith",
    date: "2024-03-19",
    thumbnail: "/blog/future-templates.jpg",
  },
  // Add more related posts
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("params", params);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="aspect-video relative">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={576}
              height={324}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-muted px-2 py-1 rounded">
                {post.category}
              </span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{post.author.name}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <IconBrandX className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <IconBrandFacebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <IconBrandLinkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <IconShare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg shadow-sm p-8 mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Author Bio */}
        <div className="rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4">About the Author</h2>
          <div className="flex items-start gap-4">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <div className="font-semibold mb-2">{post.author.name}</div>
              <p className="text-muted-foreground">{post.author.bio}</p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-card rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="aspect-video bg-muted relative">
                      <Image
                        src={relatedPost.thumbnail}
                        alt={relatedPost.title}
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
                          {relatedPost.category}
                        </span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {relatedPost.date}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            <BgButton className="w-fit">View All Posts</BgButton>
          </div>
        )}
      </div>
    </div>
  );
}
