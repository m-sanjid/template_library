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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative">
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
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-3 gap-4 h-[40rem] overflow-hidden border rounded-2xl p-3 bg-black/5 dark:bg-white/5 backdrop-blur-md">
          {["up", "down", "up"].map((direction, index) => (
            <div key={index} className="relative w-full h-full overflow-hidden">
              <motion.div
                className="flex flex-col gap-4 absolute w-full"
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
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b dark:from-neutral-900 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t dark:from-neutral-900 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-black/5 dark:bg-white/5 rounded-xl p-8 flex flex-col justify-between h-64 border">
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
        <div className="flex items-center justify-end mt-2">
          <div className="bg-black/20 dark:bg-white/20 rounded-md p-2 w-8 h-8 flex items-center justify-center">
            <span className="text-white text-xs">X</span>
          </div>
        </div>
      </div>
    </div>
  );
};
