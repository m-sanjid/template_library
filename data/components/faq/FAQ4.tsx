"use client";

import React, { useState } from "react";
import { motion, Variants } from "motion/react";

const fadeIn = (delay: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
    },
  },
});

const slideInFromBottom = (delay: number = 0): Variants => ({
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay,
    },
  },
});

const FAQ4 = () => {
  return (
    <motion.section
      className="bg-primary/5 container mx-auto mb-20 rounded-3xl px-4 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn()}
    >
      <motion.div
        className="mb-12 text-center"
        variants={slideInFromBottom(0.1)}
      >
        <h2 className="mb-4 text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Find answers to common questions about our pricing and plans.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <FaqItem
          question="Can I upgrade or downgrade my plan later?"
          answer="Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
        />
        <FaqItem
          question="Do you offer refunds?"
          answer="We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 14 days of your initial purchase."
        />
        <FaqItem
          question="What payment methods do you accept?"
          answer="We accept all major credit cards (Visa, Mastercard, American Express, Discover), as well as PayPal. For Enterprise plans, we also offer invoice-based payments."
        />
        <FaqItem
          question="Is there a contract or commitment?"
          answer="There is no long-term contract or commitment. You can cancel your subscription at any time, and your access will continue until the end of your current billing period."
        />
        <FaqItem
          question="Do you offer discounts for non-profits or educational institutions?"
          answer="Yes, we offer special discounts for non-profit organizations, educational institutions, and open-source projects. Please contact our sales team for more information."
          isLast
        />
      </div>
    </motion.section>
  );
};

export default FAQ4;

interface FaqItemProps {
  question: string;
  answer: string;
  isLast?: boolean;
}

function FaqItem({ question, answer, isLast = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={`border-t py-6 ${!isLast && "border-b"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 flex-shrink-0"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          marginTop: isOpen ? 16 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-muted-foreground">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
