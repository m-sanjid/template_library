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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">{about.title}</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            {about.description}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {about.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 text-center shadow-sm"
            >
              <div className="mb-2 bg-gradient-to-b from-neutral-950 via-neutral-400 to-neutral-800 bg-clip-text text-[4rem] font-bold text-transparent">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Our Values</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {about.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  {value.title === "Innovation" && (
                    <Target className="text-primary h-6 w-6" />
                  )}
                  {value.title === "Quality" && (
                    <Award className="text-primary h-6 w-6" />
                  )}
                  {value.title === "Community" && (
                    <Users className="text-primary h-6 w-6" />
                  )}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="mb-8 text-center text-2xl font-bold">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card overflow-hidden rounded-lg shadow-sm"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
                  <div className="text-muted-foreground mb-4 text-sm">
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
                        <IconBrandX className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <IconBrandLinkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <IconBrandGithub className="h-5 w-5" />
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
          <h2 className="mb-8 text-center text-2xl font-bold">
            Global Presence
          </h2>
          <div className="rounded-lg bg-black/5 p-8 shadow-sm backdrop-blur-md dark:bg-white/5">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="flex items-center">
                <Globe className="text-primary mr-2 h-6 w-6" />
                <span className="">150+ Countries</span>
              </div>
              <div className="flex items-center">
                <Users className="text-primary mr-2 h-6 w-6" />
                <span className="">1M+ Users</span>
              </div>
              <div className="flex items-center">
                <Target className="text-primary mr-2 h-6 w-6" />
                <span className="">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-8 text-center shadow-sm"
        >
          <h2 className="mb-4 text-2xl font-semibold">Join Our Journey</h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
            Be part of our mission to revolutionize template creation and
            management. Start creating professional templates today.
          </p>
          <div className="flex justify-center gap-4">
            <AnimatedButton
              label="Browse Templates"
              className="bg-primary text-secondary rounded-full border"
              to="/templates"
            />
            <AnimatedButton
              label="Contact Us"
              className="bg-primary text-secondary rounded-full border"
              to="/contact"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
