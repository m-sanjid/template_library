"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ADDITIONAL_PAGES } from "@/lib/config";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import SectionHeader from "@/components/SectionHeader";

const { faq } = ADDITIONAL_PAGES;

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useKeyboardShortcut([
    {
      key: "/",
      callback: () => {
        searchInputRef.current?.focus();
      },
    },
  ]);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const filteredCategories = faq.categories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const visibleCategories =
    activeCategory === "all"
      ? filteredCategories
      : filteredCategories.filter((c) => c.name === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader label="FAQ" title="Frequently Asked Questions" description="Find answers to common questions about our template library and services" gradientText="Questions" textHeight={160} />

        {/* Search and Categories */}
        <div className="space-y-6 mb-12">
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              ref={searchInputRef}
              placeholder="Search questions... (Press '/' to focus)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
            >
              All Categories
            </Button>
            {faq.categories.map((category) => (
              <Button
                key={category.name}
                variant={activeCategory === category.name ? "default" : "outline"}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {visibleCategories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card  rounded-lg shadow-sm overflow-hidden"
            >
              <div className="border-b border-border p-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {category.name}
                </h2>
              </div>

              {/* Questions */}
              <div className="divide-y divide-border">
                {category.questions.map((item) => {
                  const questionId = `${category.name}-${item.question}`;
                  const isExpanded = expandedQuestions.includes(questionId);

                  return (
                    <div key={questionId} className="border-t border-border">
                      <button
                        className="w-full text-left px-6 py-4 focus:outline-none"
                        onClick={() => toggleQuestion(questionId)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-foreground">
                            {item.question}
                          </h3>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform ${
                              isExpanded ? "transform rotate-180" : ""
                            }`}
                          />
                        </div>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-2"
                            >
                              <p className="text-muted-foreground">{item.answer}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {category.questions.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-muted-foreground">
                    No questions found in this category.
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Global Empty State */}
        {visibleCategories.every((c) => c.questions.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
              <Search className="w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No questions found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search query or category filter.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center bg-card rounded-lg shadow-sm p-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Please chat with our friendly
            team.
          </p>
          <Button asChild>
            <a href="/contact">Contact Support</a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 