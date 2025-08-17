"use client";
import React from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our platform",
    features: [
      "5 AI-generated templates/month",
      "Basic customization",
      "Email support",
      "Community access",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for growing businesses",
    point: "Everything in the Free plus :",
    features: [
      "Unlimited AI-generated templates",
      "Advanced customization",
      "Priority support",
      "Team collaboration",
      "Custom branding",
      "Analytics dashboard",
    ],
    popular: true,
  },
];

function Pricing4() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            Choose the plan that's right for you
          </p>
        </motion.div>
        <div className="mt-20 grid gap-6 md:grid-cols-5 md:gap-0">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`col-span-1 w-full p-6 lg:p-8 ${plan.popular ? "md:col-span-3 md:-ml-2 md:scale-105 dark:bg-zinc-900" : "md:col-span-2"}`}
            >
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 ${plan.popular ? "md:grid-cols-2" : ""}`}
              >
                <CardHeader className="col-span-1 space-y-4">
                  <h3 className="">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-semibold">{plan.price}</span>
                    <span className="ml-1 text-2xl">/month</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                  <Button
                    className={
                      plan.popular
                        ? "border bg-linear-to-tr from-black/70 to-black/80 text-white inset-shadow-2xs inset-shadow-white/25 dark:from-white/70 dark:to-white dark:text-black"
                        : "text-secondary-foreground border bg-linear-to-tr from-white/50 to-white/50 dark:from-zinc-900 dark:to-zinc-800"
                    }
                  >
                    Get started
                  </Button>
                </CardHeader>
                <CardContent
                  className={`col-span-1 mt-2 p-4 ${plan.popular ? "" : "border-muted border-t border-dashed"}`}
                >
                  <p className="mb-4 text-sm font-semibold text-zinc-700 dark:text-white">
                    {plan.point}
                  </p>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckIcon className="text-primary h-5 w-5 dark:text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing4;
