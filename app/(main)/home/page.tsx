"use client";
import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Star, Plus, Bookmark, Download, Eye, Grid, Bell } from "lucide-react";
import { AnimatedButton } from "@/components/AnimatedButton";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Welcome Section */}
      <section className="relative overflow-hidden py-12">
        <div className="from-primary/5 to-background absolute inset-0 bg-gradient-to-b" />
        <div className="relative container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-between gap-8 md:flex-row"
          >
            <div>
              <h1 className="mb-4 text-4xl font-bold">
                Welcome back, <span className="text-primary">User</span>
              </h1>
              <p className="text-muted-foreground text-xl">
                Here&apos;s what&apos;s new in your template library
              </p>
            </div>
            <div className="flex gap-4">
              <AnimatedButton
                label="Create Template"
                className="bg-primary text-secondary rounded-full border"
                to="/templates"
              />
              <AnimatedButton
                label="Browse Templates"
                className="bg-primary text-secondary rounded-full border"
                to="/templates"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {[
              {
                label: "Saved Templates",
                value: "12",
                icon: <Bookmark className="h-6 w-6" />,
              },
              {
                label: "Downloads",
                value: "48",
                icon: <Download className="h-6 w-6" />,
              },
              {
                label: "Recent Views",
                value: "156",
                icon: <Eye className="h-6 w-6" />,
              },
              {
                label: "Favorites",
                value: "8",
                icon: <Star className="h-6 w-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-muted-foreground">{stat.label}</div>
                  <div className="text-primary">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity & Quick Actions */}
      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <Button>View All</Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    action: "Downloaded",
                    template: "Professional Resume",
                    time: "2 hours ago",
                  },
                  {
                    action: "Saved",
                    template: "Business Proposal",
                    time: "5 hours ago",
                  },
                  {
                    action: "Viewed",
                    template: "Marketing Campaign",
                    time: "1 day ago",
                  },
                  {
                    action: "Created",
                    template: "Custom Portfolio",
                    time: "2 days ago",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card flex items-center gap-4 rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      {activity.action === "Downloaded" && (
                        <Download className="text-primary h-5 w-5" />
                      )}
                      {activity.action === "Saved" && (
                        <Bookmark className="text-primary h-5 w-5" />
                      )}
                      {activity.action === "Viewed" && (
                        <Eye className="text-primary h-5 w-5" />
                      )}
                      {activity.action === "Created" && (
                        <Plus className="text-primary h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {activity.action} {activity.template}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {activity.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Create New Template",
                    icon: <Plus className="h-5 w-5" />,
                  },
                  {
                    label: "Browse Categories",
                    icon: <Grid className="h-5 w-5" />,
                  },
                  {
                    label: "View Favorites",
                    icon: <Star className="h-5 w-5" />,
                  },
                  {
                    label: "Check Updates",
                    icon: <Bell className="h-5 w-5" />,
                  },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card group cursor-pointer rounded-lg p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-primary transition-transform group-hover:scale-110">
                        {action.icon}
                      </div>
                      <div className="font-medium">{action.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
