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
    <section id={id} className="overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10 text-center md:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-4 bg-gradient-to-r from-neutral-900 to-neutral-500 bg-clip-text text-2xl font-bold text-transparent md:mb-6 md:text-3xl lg:text-4xl dark:from-neutral-600 dark:to-neutral-800"
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg"
          >
            Hear what my clients have to say about our collaborative journey and
            the results we've achieved together.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          {/* Preview cards - Only visible on large screens */}
          <div className="absolute top-1/2 -left-2 z-10 hidden -translate-y-1/2 md:left-0 lg:left-4 lg:block">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`h-64 w-48 rounded-xl md:h-72 md:w-56 lg:h-80 lg:w-64 ${prevTestimonial.bgColor} -rotate-6 transform cursor-pointer p-4 shadow-lg transition-all duration-300 hover:rotate-0 md:p-6`}
              onClick={handlePrev}
            >
              <div className="flex h-full flex-col justify-between opacity-50">
                <Quote size={16} className="text-muted-foreground" />
                <p className="line-clamp-3 text-xs md:text-sm">
                  {prevTestimonial.content}
                </p>
                <div>
                  <p className="text-xs font-semibold md:text-sm">
                    {prevTestimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="absolute top-1/2 -right-2 z-10 hidden -translate-y-1/2 md:right-0 lg:right-4 lg:block">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 0.7, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`h-64 w-48 rounded-xl md:h-72 md:w-56 lg:h-80 lg:w-64 ${nextTestimonial.bgColor} rotate-6 transform cursor-pointer p-4 shadow-lg transition-all duration-300 hover:rotate-0 md:p-6`}
              onClick={handleNext}
            >
              <div className="flex h-full flex-col justify-between opacity-50">
                <Quote size={16} className="text-muted-foreground" />
                <p className="line-clamp-3 text-xs md:text-sm">
                  {nextTestimonial.content}
                </p>
                <div>
                  <p className="text-xs font-semibold md:text-sm">
                    {nextTestimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main testimonial */}
          <div className="relative flex h-[32rem] items-center justify-center px-2 sm:h-[28rem] sm:px-4 md:h-[26rem] md:px-18 lg:mx-46 lg:h-[30rem]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`absolute inset-0 mx-auto w-full max-w-4xl ${currentTestimonial.bgColor} overflow-hidden rounded-2xl shadow-2xl backdrop-blur-lg`}
              >
                <div className="mx-10 grid h-full grid-cols-1 lg:grid-cols-5">
                  <div className="relative flex items-center justify-center p-4 sm:p-6 md:p-8 lg:col-span-2">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-30 blur-3xl"></div>
                      <div
                        className={`h-20 w-20 rounded-full border-4 sm:h-24 sm:w-24 md:h-32 md:w-32 ${currentTestimonial.accentColor} overflow-hidden`}
                      >
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:col-span-3 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <div className="text-muted-foreground mb-3 flex md:mb-6">
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
                      <blockquote className="relative mb-4 md:mb-8">
                        <Quote
                          size={24}
                          className="text-muted-foreground absolute -top-2 -left-2 mb-2 opacity-40"
                        />
                        <p className="text-muted-foreground pl-6 text-sm font-light italic md:text-base">
                          "{currentTestimonial.content}"
                        </p>
                      </blockquote>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 md:text-lg dark:text-white">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-muted-foreground text-sm md:text-base">
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
          <div className="mt-4 flex items-center justify-between px-4 md:mt-6 md:px-12 lg:mt-8 lg:px-24">
            <button
              onClick={handlePrev}
              className="group rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl md:p-3 dark:bg-slate-800"
              aria-label="Previous testimonial"
            >
              <ChevronLeft
                size={20}
                className="text-slate-600 transition-colors group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400"
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
                  className={`h-2 w-2 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
                    idx === currentIndex
                      ? "w-6 bg-indigo-600 md:w-10 dark:bg-indigo-400"
                      : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="group rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-xl md:p-3 dark:bg-slate-800"
              aria-label="Next testimonial"
            >
              <ChevronRight
                size={20}
                className="text-slate-600 transition-colors group-hover:text-indigo-600 dark:text-slate-200 dark:group-hover:text-indigo-400"
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
