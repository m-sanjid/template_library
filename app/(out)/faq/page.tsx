"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ADDITIONAL_PAGES } from "@/lib/config";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import SectionHeader from "@/components/SectionHeader";
import { AnimatedButton } from "@/components/AnimatedButton";

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
        : [...prev, questionId],
    );
  };

  const filteredCategories = faq.categories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }));

  const visibleCategories =
    activeCategory === "all"
      ? filteredCategories
      : filteredCategories.filter((c) => c.name === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          label="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our template library and services"
          gradientText="Questions"
          textHeight={160}
        />

        {/* Search and Categories */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform" />
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
                variant={
                  activeCategory === category.name ? "default" : "outline"
                }
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
              className="bg-card overflow-hidden rounded-lg shadow-sm"
            >
              <div className="border-border border-b p-6">
                <h2 className="text-foreground text-2xl font-semibold">
                  {category.name}
                </h2>
              </div>

              {/* Questions */}
              <div className="divide-border divide-y">
                {category.questions.map((item) => {
                  const questionId = `${category.name}-${item.question}`;
                  const isExpanded = expandedQuestions.includes(questionId);

                  return (
                    <div key={questionId} className="border-border border-t">
                      <button
                        className="w-full px-6 py-4 text-left focus:outline-none"
                        onClick={() => toggleQuestion(questionId)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-foreground text-lg font-medium">
                            {item.question}
                          </h3>
                          <ChevronDown
                            className={`text-muted-foreground h-5 w-5 transition-transform ${
                              isExpanded ? "rotate-180 transform" : ""
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
                              <p className="text-muted-foreground">
                                {item.answer}
                              </p>
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
            className="py-12 text-center"
          >
            <div className="text-muted-foreground mx-auto mb-4 h-16 w-16">
              <Search className="h-full w-full" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">
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
          className="bg-card mt-12 rounded-lg p-8 text-center shadow-sm"
        >
          <h2 className="text-foreground mb-4 text-2xl font-semibold">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-6">
            Can&apos;t find the answer you&apos;re looking for? Please chat with
            our friendly team.
          </p>
          <AnimatedButton
            label="Contact Support"
            className="bg-primary text-secondary rounded-full border"
            to="/contact"
          />
        </motion.div>
      </div>
    </div>
  );
}
