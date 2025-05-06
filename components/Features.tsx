import { FEATURES, FeaturesType } from "@/lib/config";
import { motion } from "motion/react";
import React from "react";
import { Card, CardContent } from "./ui/card";
import SectionHeader from "./SectionHeader";

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          label="Features"
          title="Everything You Need to Create Amazing Templates"
          description="Powerful features that help you create, customize, and manage your templates efficiently."
          gradientText="FEATURES"
          textHeight={80}
          mdTextHeight={200}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-6"
        >
          <FeatureCard feature={FEATURES[0]} />
          <FeatureCard feature={FEATURES[1]} />
          <div className="grid grid-rows-2 gap-2">
            <FeatureCard2 feature={FEATURES[2]} />
            <FeatureCard2 feature={FEATURES[3]} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

const FeatureCard = ({ feature }: { feature: FeaturesType }) => {
  return (
    <Card className="p-[10px] rounded-3xl bg-black/5 dark:bg-white/5">
      <Card className="h-[24rem] rounded-[16px] overflow-hidden">
        <div className="h-full w-full bg-black/20 dark:bg-white/5"></div>
      </Card>
      <CardContent className="p-4 ">
        <h3 className="text-xl font-semibold">{feature.title}</h3>
        <p className="text-neutral-400">{feature.description}</p>
      </CardContent>
    </Card>
  );
};

const FeatureCard2 = ({ feature }: { feature: FeaturesType }) => {
  return (
    <Card className="overflow-hidden rounded-3xl">
      <div className="h-[4rem] w-full bg-black/20 rounded-t-lg"></div>
      <CardContent className="flex flex-col justify-center h-full">
        <h3 className="text-xl font-semibold">{feature.title}</h3>
        <p className="text-neutral-400">{feature.description}</p>
      </CardContent>
    </Card>
  );
};
