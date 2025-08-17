import { TEMPLATE_CATEGORIES } from "@/lib/config";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import SectionHeader from "./SectionHeader";

const CategoriesSection = () => {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Templates"
          title="Templates for Every Need"
          description="Browse our extensive collection of templates across various categories."
          gradientText="TEMPLATES"
          textHeight={60}
          mdTextHeight={160}
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {TEMPLATE_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-pointer rounded-xl p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <h3 className="mb-2 text-xl font-semibold dark:text-white">
                {category.name}
              </h3>
              <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="flex items-center text-neutral-500 dark:text-neutral-400"
                  >
                    <Check className="mr-2 h-4 w-4 text-blue-500" />
                    {sub}
                  </li>
                ))}
              </ul>
              <div className="absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:opacity-100">
                <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
