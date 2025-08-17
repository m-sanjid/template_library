import React from "react";
import { motion } from "motion/react";
import { BanIcon } from "lucide-react";
import SectionHeader from "./SectionHeader";
//TODO: add images and change texts

const StatsSection = () => {
  return (
    <div className="relative mx-auto my-20 max-w-5xl">
      <SectionHeader
        label="Benifits"
        title="Everything You Need to Create Amazing Templates"
        description="Powerful features that help you create, customize, and manage your templates efficiently."
        gradientText="BENIFITS"
        textHeight={100}
        mdTextHeight={240}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="my-6 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3"
      >
        <StatsCard
          title="Wide Range of Templates"
          description="wide range of templates to choose from"
        />
        <StatsCard
          title="Easy to Use"
          description="Easy to use templates with a user-friendly interface"
        />
        <StatsCard
          title="Customizable"
          description="Customizable templates to meet your needs"
        />
      </motion.div>
    </div>
  );
};

export default StatsSection;

const StatsCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col justify-between rounded-lg border bg-gradient-to-b from-white/5 via-black/5 to-white/5 p-4 backdrop-blur-sm">
      <div className="w-fit rounded-md bg-white/10 p-3">
        <BanIcon />
      </div>
      <div className="mt-10 px-2">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-muted-foreground text-sm">{description}</div>
      </div>
    </div>
  );
};
