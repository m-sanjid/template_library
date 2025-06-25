"use client";

import { motion } from "motion/react";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PRICING } from "@/lib/config";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(false);
    const [isLoading, setIsLoading] = useState<string | null>(null);
    return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-lg text-muted-foreground mt-4">Choose the plan that's right for you</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4">
        <span className={`text-sm ${!isAnnual ? "text-primary" : "text-muted-foreground"}`}>Monthly</span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:ring-2 focus:ring-primary ${isAnnual ? "bg-primary" : "bg-neutral-300"}`}
        >
          <span
            className={`inline-block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${isAnnual ? "translate-x-7" : "translate-x-1"}`}
          />
        </button>
        <span className={`text-sm ${isAnnual ? "text-primary" : "text-muted-foreground"}`}>
          Annual <span className="text-green-500 font-semibold">(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(PRICING).map(([key, plan], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`relative overflow-hidden ${key === "PRO" ? "border-primary shadow-2xl scale-105 bg-primary/10" : "hover:shadow-lg transition"}`}>
              {key === "PRO" && (
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-bl-md">Most Popular</div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${isAnnual ? (plan.price * 0.8 * 12).toFixed(2) : plan.price.toFixed(2)}</span>
                  <span className="text-muted-foreground"> / {isAnnual ? "year" : "month"}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={key === "PRO" ? "default" : "outline"}
                  disabled={isLoading === plan.name}
                >
                  {isLoading === plan.name ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Get ${plan.name}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
