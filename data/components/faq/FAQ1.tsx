"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon } from "lucide-react";

const faqs = [
  {
    question: "How does the AI email template generator work?",
    answer:
      "Our AI analyzes your requirements and generates professional email templates using advanced machine learning algorithms. Simply input your needs, and the AI will create a customized template that you can further refine.",
  },
  {
    question: "Can I customize the generated templates?",
    answer:
      "Yes, absolutely! All templates are fully customizable. You can modify colors, fonts, layouts, and content to match your brand identity and specific needs.",
  },
  {
    question: "Are the templates mobile-responsive?",
    answer:
      "Yes, all our templates are fully responsive and tested across various email clients and devices to ensure they look great everywhere.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a free plan that lets you generate up to 5 templates per month. This allows you to try our platform and see the value before committing to a paid plan.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer email support for all users and priority support for Pro and Enterprise plans. Enterprise customers also get a dedicated account manager.",
  },
];

function FAQ1() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Can't find what you're looking for?{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Contact our support team
            </a>
            .
          </p>
        </motion.div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              layoutId={`faq-${index}`}
              className="overflow-hidden rounded-xl bg-white shadow-md dark:bg-zinc-900"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-medium"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`h-6 w-6 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    layoutId={`faq-${index}`}
                    className="px-6 pb-5 text-neutral-600 dark:text-neutral-300"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ1;
