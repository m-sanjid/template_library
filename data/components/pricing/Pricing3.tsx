"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const pricingPlan = [
  {
    id: 1,
    name: "Basic",
    price: 19,
    description: "For individual developers",
    features: ["Single template download", "6 months support", "Free updates"],
  },
  {
    id: 2,
    name: "Pro",
    isPro: true,
    price: 49,
    description: "For professional developers",
    features: [
      "Unlimited template downloads",
      "Priority support",
      "Early access to new templates",
      "Free updates",
      "Team collaboration",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    price: 499,
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Custom template requests",
      "Free updates",
      "API access",
      "Dedicated account manager",
      "Team collaboration",
    ],
  },
];

export default function Pricing3() {
  const [isAnnual, setIsAnnual] = useState(false);

  const planDuration = (plan: any) => {
    if (plan.id === 1) return "per Template";
    if (plan.id === 3) return "year";
    return isAnnual ? "year" : "month";
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-4 px-4 text-center md:px-6">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              Choose the plan that works best for you and your team. All plans
              include a 14-day free trial.
            </p>

            <Tabs defaultValue="monthly" className="mx-auto w-full max-w-5xl">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="monthly" onClick={() => setIsAnnual(false)}>
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" onClick={() => setIsAnnual(true)}>
                  Yearly{" "}
                  <Badge
                    variant="outline"
                    className="bg-primary/20 text-primary ml-2"
                  >
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value={isAnnual ? "yearly" : "monthly"}
                className="mt-6"
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
                  {pricingPlan.map((plan) => (
                    <Card
                      className={`relative flex flex-col ${plan.isPro ? "bg-primary/10 border-primary scale-110 border-2" : ""}`}
                      key={plan.id}
                    >
                      {plan.isPro && (
                        <Badge className="absolute -top-4 left-1/2 -translate-x-1/2">
                          Popular
                        </Badge>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="text-4xl font-bold">${plan.price}</div>
                        <div className="text-muted-foreground">{`per ${planDuration(plan)}`}</div>
                        <ul className="mt-4 space-y-2 text-left">
                          {plan.features.map((feature, index) => (
                            <li className="flex items-center" key={index}>
                              <Check className="text-primary mr-2 h-4 w-4" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Buy Now</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  );
}
