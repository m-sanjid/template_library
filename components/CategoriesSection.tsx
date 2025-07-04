import { TEMPLATE_CATEGORIES } from "@/lib/config";
import { Check } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import SectionHeader from "./SectionHeader";

const CategoriesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Templates"
          title="Templates for Every Need"
          description="Browse our extensive collection of templates across various categories."
          gradientText="TEMPLATES"
          textHeight={60}
          mdTextHeight={160}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLATE_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {category.name}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {category.description}
              </p>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="flex items-center text-neutral-500 dark:text-neutral-400"
                  >
                    <Check className="w-4 h-4 mr-2 text-blue-500" />
                    {sub}
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
