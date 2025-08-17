"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { COMPONENTS } from "@/data/components";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Preview } from "@/components/ui/preview";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const ComponentsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <SectionHeader
          label="Components Library"
          title="Premium UI Components"
          description="Discover our collection of pre-built components, crafted with attention to detail and ready for your next project."
          gradientText="Components"
          textHeight={100}
          mdTextHeight={105}
          lgTextHeight={120}
        />

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4 border-white/10 bg-white/5 backdrop-blur-sm">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white/10"
            >
              All Components
            </TabsTrigger>
            <TabsTrigger
              value="popular"
              className="data-[state=active]:bg-white/10"
            >
              Popular
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="data-[state=active]:bg-white/10"
            >
              New
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="data-[state=active]:bg-white/10"
            >
              Premium
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {COMPONENTS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="group hover:border-primary/50 overflow-hidden border-2 border-white/10 bg-black/5 backdrop-blur-sm transition-all duration-300">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="group-hover:text-primary text-2xl font-semibold transition-colors">
                          {item.title}
                        </h2>
                        <Badge
                          variant="secondary"
                          className="group-hover:bg-primary/10 bg-white/10 backdrop-blur-sm"
                        >
                          {item.type ? "Multiple Variants" : "Single"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="space-y-4">
                        <div className="relative h-48 overflow-hidden rounded-lg bg-black/20">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Preview
                              component={
                                item.component ||
                                item.type?.[Object.keys(item.type)[0]]
                                  ?.component
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Link href={`/components/${item.id}`}>
                            <Button className="group w-full" variant="outline">
                              View Details
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="group bg-white text-black hover:bg-white/90"
          >
            Show More Components
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
