import React from "react";
import Link from "next/link";
import { TEMPLATE_CATEGORIES, TemplateType } from "@/lib/config";
import { Button } from "./ui/button";
import SectionHeader from "./SectionHeader";
import { motion } from "motion/react";
import { Star, Download, Eye, Heart, Share2 } from "lucide-react";
import { Badge } from "./ui/badge";

export const TemplateCard = ({
  template,
  index,
}: {
  template: TemplateType;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative grid h-[10rem] w-full grid-cols-1 gap-1 overflow-hidden md:grid-cols-4">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/60" />
        <div className="z-20 col-span-1 p-4">
          <h3 className="mb-1 text-xl font-bold text-white">{template.name}</h3>
          <p className="line-clamp-2 text-sm text-white/80">
            {template.description}
          </p>
        </div>
        <div className="col-span-3 grid grid-cols-3 gap-1 p-1">
          <div className="rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="rounded-lg bg-neutral-300 dark:bg-neutral-700" />
          <div className="rounded-lg bg-neutral-400 dark:bg-neutral-600" />
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              4.8
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              1.2k
            </Badge>
          </div>
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </div>
          <Button size="sm" className="gap-2">
            {template.price ? `$${template.price}` : "Download"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const TemplatesPreview = () => {
  return (
    <div className="relative my-20">
      <SectionHeader
        label="Templates"
        title="Preview Templates"
        description="Choose from a variety of templates to get started"
        gradientText="TEMPLATES"
        textHeight={70}
        mdTextHeight={120}
      />

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-6">
          {TEMPLATE_CATEGORIES.map((template, idx) => (
            <Link href={`/templates/`} key={idx}>
              <TemplateCard key={idx} template={template} index={idx} />
            </Link>
          ))}
        </div>

        <div className="mt-12 flex w-full items-center justify-center">
          <Link href="/templates">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full"
            >
              <span className="relative z-10">Show More Templates</span>
              <div className="from-primary/20 to-primary/0 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPreview;
