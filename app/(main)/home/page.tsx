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
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="container max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome back, <span className="text-primary">User</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Here&apos;s what&apos;s new in your template library
              </p>
            </div>
            <div className="flex gap-4">
              <AnimatedButton
                label="Create Template"
                className="border rounded-full bg-primary text-secondary"
                to="/templates"
              />
              <AnimatedButton
                label="Browse Templates"
                className="border rounded-full bg-primary text-secondary"
                to="/templates"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Saved Templates",
                value: "12",
                icon: <Bookmark className="w-6 h-6" />,
              },
              {
                label: "Downloads",
                value: "48",
                icon: <Download className="w-6 h-6" />,
              },
              {
                label: "Recent Views",
                value: "156",
                icon: <Eye className="w-6 h-6" />,
              },
              {
                label: "Favorites",
                value: "8",
                icon: <Star className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
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
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <Button >View All</Button>
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
                    className="flex items-center gap-4 p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.action === "Downloaded" && (
                        <Download className="w-5 h-5 text-primary" />
                      )}
                      {activity.action === "Saved" && (
                        <Bookmark className="w-5 h-5 text-primary" />
                      )}
                      {activity.action === "Viewed" && (
                        <Eye className="w-5 h-5 text-primary" />
                      )}
                      {activity.action === "Created" && (
                        <Plus className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">
                        {activity.action} {activity.template}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Create New Template",
                    icon: <Plus className="w-5 h-5" />,
                  },
                  {
                    label: "Browse Categories",
                    icon: <Grid className="w-5 h-5" />,
                  },
                  {
                    label: "View Favorites",
                    icon: <Star className="w-5 h-5" />,
                  },
                  {
                    label: "Check Updates",
                    icon: <Bell className="w-5 h-5" />,
                  },
                ].map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-primary group-hover:scale-110 transition-transform">
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
