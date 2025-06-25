"use client"

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlusIcon, SearchIcon, ChevronDownIcon } from 'lucide-react';

const faqs = [
  { category: 'Pricing', question: 'How much does it cost?', answer: 'Our pricing starts at $19.99 per month.' },
  { category: 'Features', question: 'What features are included?', answer: 'We offer real-time analytics, collaboration tools, and integrations.' },
  { category: 'Support', question: 'How can I contact support?', answer: 'You can reach our support team via live chat or email.' },
  { category: 'Account Management', question: 'How do I update my account details?', answer: 'Go to your account settings and edit your information.' },
];

const categories = ['All', 'Pricing', 'Features', 'Support', 'Account Management'];

const FAQ3 = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq =>
      (category === 'All' || faq.category === category) &&
      faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [category, searchTerm]);

  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-6">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Frequently Asked Questions
      </motion.h2>
      
      {/* Search and Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between gap-4 mb-8"
      >
        <div className="relative w-full md:w-2/3">
          <SearchIcon className="absolute left-3 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search questions..."
            className="pl-10 p-3 w-full border rounded-lg focus:ring-2 focus:ring-primary transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="p-3 border rounded-lg transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </motion.div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-neutral-500"
          >
            No results found.
          </motion.p>
        ) : (
          <AnimatePresence>
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05
                }}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PlusIcon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-left">{faq.question}</span>
                  </div>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`} 
                  />
                </motion.button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="overflow-hidden px-4 py-4"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      {/* Contact Support CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-10"
      >
        <p>
          Still have questions? 
          <motion.a 
            href="/contact" 
            className="text-primary font-semibold hover:underline ml-2"
          >
            Contact Support
          </motion.a>
        </p>
      </motion.div>
    </div>
  );
};

export default FAQ3;