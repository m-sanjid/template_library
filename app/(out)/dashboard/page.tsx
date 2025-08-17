"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Upload,
  Eye,
  Star,
  Clock,
  Users,
  CreditCard,
  Settings,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Welcome Section */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold">
              Welcome back,{" "}
              <span className="text-primary">{session?.user?.name}</span>
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s what&apos;s happening with your templates
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Downloads",
              value: "1,234",
              change: "+12.5%",
              trend: "up",
              icon: <Download className="h-6 w-6" />,
            },
            {
              title: "Active Templates",
              value: "45",
              change: "+5.2%",
              trend: "up",
              icon: <Upload className="h-6 w-6" />,
            },
            {
              title: "Total Views",
              value: "8,567",
              change: "-2.1%",
              trend: "down",
              icon: <Eye className="h-6 w-6" />,
            },
            {
              title: "Average Rating",
              value: "4.8",
              change: "+0.3",
              trend: "up",
              icon: <Star className="h-6 w-6" />,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="text-muted-foreground">{stat.title}</div>
                <div className="text-primary">{stat.icon}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div
                  className={`flex items-center text-sm ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Charts Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="weekly">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Analytics</h2>
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="weekly" className="space-y-6">
                  <div className="bg-muted flex h-[300px] items-center justify-center rounded-lg">
                    <LineChart className="text-muted-foreground h-8 w-8" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted flex h-[200px] items-center justify-center rounded-lg">
                      <BarChart className="text-muted-foreground h-8 w-8" />
                    </div>
                    <div className="bg-muted flex h-[200px] items-center justify-center rounded-lg">
                      <PieChart className="text-muted-foreground h-8 w-8" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="monthly">
                  {/* Similar content for monthly view */}
                </TabsContent>
                <TabsContent value="yearly">
                  {/* Similar content for yearly view */}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Status */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Subscription Status</h3>
                <Badge variant="secondary">Pro Plan</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Next billing date
                  </span>
                  <span>March 1, 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Payment method</span>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>•••• 4242</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    action: "Downloaded",
                    template: "Business Proposal",
                    time: "2 hours ago",
                  },
                  {
                    action: "Updated",
                    template: "Resume Template",
                    time: "5 hours ago",
                  },
                  {
                    action: "Viewed",
                    template: "Marketing Campaign",
                    time: "1 day ago",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                      <Clock className="text-primary h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {activity.action} {activity.template}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Team Members */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Team Members</h3>
                <Button variant="ghost" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "John Doe", role: "Admin" },
                  { name: "Jane Smith", role: "Editor" },
                  { name: "Mike Johnson", role: "Viewer" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                      <span className="text-primary text-sm font-medium">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
