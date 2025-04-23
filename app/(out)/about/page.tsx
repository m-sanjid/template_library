"use client";

import { motion } from "motion/react";
import { ADDITIONAL_PAGES } from "@/lib/config";
import { Users, Target, Award, Globe } from "lucide-react";
import Image from "next/image";
import {
  IconBrandX,
  IconBrandLinkedin,
  IconBrandGithub,
} from "@tabler/icons-react";
import { AnimatedButton } from "@/components/AnimatedButton";
const { about } = ADDITIONAL_PAGES;

// Mock team data - replace with actual data
const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    bio: "10+ years of experience in template design and software development.",
    avatar: "/team/john-smith.jpg",
    social: {
      twitter: "https://twitter.com/johnsmith",
      linkedin: "https://linkedin.com/in/johnsmith",
      github: "https://github.com/johnsmith",
    },
  },
  {
    name: "Sarah Johnson",
    role: "Head of Design",
    bio: "Award-winning designer with expertise in UI/UX and template creation.",
    avatar: "/team/sarah-johnson.jpg",
    social: {
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
  },
  // Add more team members
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">{about.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {about.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {about.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg shadow-sm p-6 text-center bg-card"
            >
              <div className="text-[4rem] font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-neutral-950 via-neutral-400 to-neutral-800">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg shadow-sm p-6 bg-card"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {value.title === "Innovation" && (
                    <Target className="w-6 h-6 text-primary" />
                  )}
                  {value.title === "Quality" && (
                    <Award className="w-6 h-6 text-primary" />
                  )}
                  {value.title === "Community" && (
                    <Users className="w-6 h-6 text-primary" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg shadow-sm overflow-hidden bg-card"
              >
                <div className="aspect-square relative">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    {member.role}
                  </div>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex gap-2">
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <IconBrandX className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <IconBrandLinkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <IconBrandGithub className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Presence */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Global Presence
          </h2>
          <div className="rounded-lg shadow-sm p-8 bg-black/5 dark:bg-white/5 backdrop-blur-md">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center">
                <Globe className="w-6 h-6 text-primary mr-2" />
                <span className="">150+ Countries</span>
              </div>
              <div className="flex items-center">
                <Users className="w-6 h-6 text-primary mr-2" />
                <span className="">1M+ Users</span>
              </div>
              <div className="flex items-center">
                <Target className="w-6 h-6 text-primary mr-2" />
                <span className="">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center rounded-lg shadow-sm p-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Be part of our mission to revolutionize template creation and
            management. Start creating professional templates today.
          </p>
          <div className="flex justify-center gap-4">
            <AnimatedButton
              label="Browse Templates"
              className="border rounded-full bg-primary text-secondary"
              to="/templates"
            />
            <AnimatedButton
              label="Contact Us"
              className="border rounded-full bg-primary text-secondary"
              to="/contact"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
