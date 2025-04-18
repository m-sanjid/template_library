"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";


const Testimonials = ({ id }: { id: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const getNextIndex = (current: number) =>
    current === testimonials.length - 1 ? 0 : current + 1;
  const getPrevIndex = (current: number) =>
    current === 0 ? testimonials.length - 1 : current - 1;

  const currentTestimonial = testimonials[currentIndex];
  const nextTestimonial = testimonials[getNextIndex(currentIndex)];
  const prevTestimonial = testimonials[getPrevIndex(currentIndex)];

  return (
    <section id={id} className="py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-600 dark:to-neutral-800"
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg"
          >
            Hear what my clients have to say about our collaborative journey and
            the results we've achieved together.
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Preview cards - Only visible on large screens */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 md:left-0 lg:left-4 z-10 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`w-48 md:w-56 lg:w-64 h-64 md:h-72 lg:h-80 rounded-xl ${prevTestimonial.bgColor} shadow-lg p-4 md:p-6 cursor-pointer transform -rotate-6 hover:rotate-0 transition-all duration-300`}
              onClick={handlePrev}
            >
              <div className="opacity-50 h-full flex flex-col justify-between">
                <Quote size={16} className="text-muted-foreground" />
                <p className="text-xs md:text-sm line-clamp-3">
                  {prevTestimonial.content}
                </p>
                <div>
                  <p className="font-semibold text-xs md:text-sm">
                    {prevTestimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:right-0 lg:right-4 z-10 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`w-48 md:w-56 lg:w-64 h-64 md:h-72 lg:h-80 rounded-xl ${nextTestimonial.bgColor} shadow-lg p-4 md:p-6 cursor-pointer transform rotate-6 hover:rotate-0 transition-all duration-300`}
              onClick={handleNext}
            >
              <div className="opacity-50 h-full flex flex-col justify-between">
                <Quote size={16} className="text-muted-foreground" />
                <p className="text-xs md:text-sm line-clamp-3">
                  {nextTestimonial.content}
                </p>
                <div>
                  <p className="font-semibold text-xs md:text-sm">
                    {nextTestimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main testimonial */}
          <div className="relative h-[32rem] sm:h-[28rem] md:h-[26rem] lg:h-[30rem] px-2 sm:px-4 md:px-18 lg:mx-46 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`absolute inset-0 mx-auto w-full max-w-4xl ${currentTestimonial.bgColor} rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 h-full mx-10">
                  <div className="lg:col-span-2 flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-30"></div>
                      <div
                        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 ${currentTestimonial.accentColor} overflow-hidden`}
                      >
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="lg:col-span-3 flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <div className="flex mb-3 md:mb-6 text-muted-foreground">
                        {Array.from({ length: currentTestimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-yellow-500 text-yellow-500"
                            />
                          ),
                        )}
                      </div>
                      <blockquote className="mb-4 md:mb-8 relative">
                        <Quote
                          size={24}
                          className="text-muted-foreground opacity-40 mb-2 absolute -top-2 -left-2"
                        />
                        <p className="text-sm md:text-base italic font-light text-muted-foreground pl-6">
                          "{currentTestimonial.content}"
                        </p>
                      </blockquote>
                      <div>
                        <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-sm md:text-base text-muted-foreground">
                          {currentTestimonial.role} ·{" "}
                          {currentTestimonial.company}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center mt-4 md:mt-6 lg:mt-8 px-4 md:px-12 lg:px-24">
            <button
              onClick={handlePrev}
              className="p-2 md:p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                size={20}
                className="text-slate-600 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              />
            </button>

            <div className="flex space-x-2 md:space-x-3">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 md:w-10 bg-indigo-600 dark:bg-indigo-400"
                      : "bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 md:p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight
                size={20}
                className="text-slate-600 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content:
        "Muhammed is an exceptional developer who delivered our project ahead of schedule. His attention to detail and problem-solving skills are impressive. We'll definitely work with him again.",
      rating: 5,
      image: "/api/placeholder/150/150",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
      accentColor: "border-indigo-400",
    },
    {
      id: 2,
      name: "David Chen",
      role: "CTO",
      company: "StartupX",
      content:
        "Working with Muhammed was a great experience. He understood our requirements perfectly and implemented solutions that exceeded our expectations. His technical knowledge is outstanding.",
      rating: 5,
      image: "/api/placeholder/150/150",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      accentColor: "border-emerald-400",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Design Lead",
      company: "CreativeStudio",
      content:
        "Muhammed has a rare combination of technical expertise and design sensibility. He transformed our concepts into a beautiful, functional application that our users love.",
      rating: 5,
      image: "/api/placeholder/150/150",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      accentColor: "border-amber-400",
    },
    {
      id: 4,
      name: "Michael Thompson",
      role: "CEO",
      company: "InnovateNow",
      content:
        "An outstanding talent who brings both technical expertise and business understanding to every project. Muhammed's work has significantly improved our product's performance and user satisfaction.",
      rating: 5,
      image: "/api/placeholder/150/150",
      bgColor: "bg-rose-50 dark:bg-rose-950/30",
      accentColor: "border-rose-400",
    },
  ];
