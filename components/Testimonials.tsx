import { TESTIMONIALS } from "@/lib/config";
import { motion, Variants } from "motion/react";
import React from "react";
import SectionHeader from "./SectionHeader";
import { IconQuoteFilled } from "@tabler/icons-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

const columnVariants = (direction: string): Variants => ({
  animate: {
    y: direction === "up" ? [0, "-50%"] : ["-50%", 0],
    transition: {
      repeat: Infinity,
      repeatType: "loop" as const,
      duration: 25,
      ease: "linear",
    },
  },
});

const Testimonials = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Testimonials"
          title="Loved by Creators Worldwide"
          description="See what our users have to say about their experience."
          gradientText="TESTIMONIALS"
          textHeight={56}
          smTextHeight={80}
          mdTextHeight={120}
          lgTextHeight={130}
        />
        <div className="relative z-20 grid h-[40rem] grid-cols-1 gap-4 overflow-hidden rounded-2xl border bg-black/5 p-3 backdrop-blur-md md:grid-cols-3 dark:bg-white/5">
          {["up", "down", "up"].map((direction, index) => (
            <div key={index} className="relative h-full w-full overflow-hidden">
              <motion.div
                className="absolute flex w-full flex-col gap-4"
                variants={columnVariants(direction)}
                animate="animate"
              >
                {TESTIMONIALS.map((testimonial, i) => (
                  <TestimonialCard
                    key={`column-${index}-testimonial-${i}`}
                    testimonial={testimonial}
                  />
                ))}
                {TESTIMONIALS.map((testimonial, i) => (
                  <TestimonialCard
                    key={`column-${index}-testimonial-duplicate-${i}`}
                    testimonial={testimonial}
                  />
                ))}
              </motion.div>
            </div>
          ))}
          <div className="absolute top-0 right-0 left-0 z-10 h-24 bg-gradient-to-b to-transparent dark:from-neutral-900"></div>
          <div className="absolute right-0 bottom-0 left-0 z-10 h-24 bg-gradient-to-t to-transparent dark:from-neutral-900"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="flex h-64 flex-col justify-between rounded-xl border bg-black/5 p-8 dark:bg-white/5">
      <div className="space-y-4">
        <div className="dark:text-muted-foreground">
          <IconQuoteFilled />
        </div>
        <p className="text-muted-foreground text-base">{testimonial.content}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-muted-foreground text-sm">{testimonial.role}</p>
        </div>
        <div className="mt-2 flex items-center justify-end">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black/20 p-2 dark:bg-white/20">
            <span className="text-xs text-white">X</span>
          </div>
        </div>
      </div>
    </div>
  );
};
