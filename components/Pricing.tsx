"use client";

import { motion } from "motion/react";
import React from "react";
import { PRICING } from "@/lib/config";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const Pricing = ({isAnnual, setIsAnnual, isLoading, handleSubscribe}: {isAnnual?: boolean, setIsAnnual: (value: boolean) => void, isLoading: string | null, handleSubscribe: (plan: string) => void}) => {
  return (
  <div>
  {/* Billing Toggle */}
  <div className="flex justify-center items-center gap-4 mb-12">
    <span
      className={`text-sm ${
        !isAnnual ? "text-primary" : "text-muted-foreground"
      }`}
    >
      Monthly
    </span>
    <button
      onClick={() => setIsAnnual(!isAnnual)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isAnnual ? "bg-primary" : "bg-input"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${
          isAnnual ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
    <span
      className={`text-sm ${
        isAnnual ? "text-primary" : "text-muted-foreground"
      }`}
    >
      Annual <span className="text-green-500">(Save 20%)</span>
    </span>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {Object.entries(PRICING).map(([key, plan], index) => (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <div
          className={`relative border rounded-xl overflow-hidden p-3 ${
            key === "PRO"
              ? "border-primary shadow-lg scale-105 bg-primary/5"
              : ""
          }`}
        >
          {key === "PRO" && (
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl">
              Popular
            </div>
          )}
          <div className="p-4 rounded-lg border">
          <div>
            <h2 className="text-2xl">{plan.name}</h2>
            <p className="text-muted-foreground">
              {key === "FREE"
                ? "Perfect for getting started"
                : key === "PRO"
                ? "Best for professionals"
                : "For large organizations"}
            </p>
          </div>
          <div className="p-4 mb-6">
            <div className="mb-6">
              <span className="text-4xl font-bold">
                ${isAnnual ? (plan.price * 0.8 * 12).toFixed(2) : plan.price}
              </span>
              <span className="text-muted-foreground">
                /{isAnnual ? "year" : "month"}
              </span>
            </div>
            <ul className="space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 my-6">
            <Button
              className="w-full"
              variant={key === "PRO" ? "default" : "outline"}
              onClick={() => handleSubscribe(plan.name)}
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
          </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>

  </div>   
  );    
};

export default Pricing;
