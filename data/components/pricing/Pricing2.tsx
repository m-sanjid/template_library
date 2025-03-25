import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    id: "basic",
    price: { monthly: "$9", yearly: "$90" },
    description: "Perfect for job seekers getting started",
    features: [
      "Basic profile builder",
      "Resume templates",
      "Job search",
      "Email support",
      "Basic analytics",
    ],
    cta: "Get Started",
    mostPopular: false,
  },
  {
    name: "Pro",
    id: "pro",
    price: { monthly: "$19", yearly: "$190" },
    description: "For serious job seekers",
    features: [
      "Everything in Basic",
      "Advanced profile builder",
      "AI-powered resume optimization",
      "Priority support",
      "Advanced analytics",
      "Job application tracking",
      "Interview preparation tools",
    ],
    cta: "Start Free Trial",
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: { monthly: "Custom", yearly: "Custom" },
    description: "For companies and organizations",
    features: [
      "Everything in Pro",
      "Custom branding",
      "Team management",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "Advanced security",
    ],
    cta: "Contact Sales",
    mostPopular: false,
  },
];

export default function Pricing2() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-primary">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Choose the right plan for you
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We offer flexible pricing plans to help you find your dream job. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative flex flex-col justify-between ${
                tier.mostPopular ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold tracking-tight">
                    {tier.price.monthly}
                  </span>
                  <span className="ml-1 text-sm font-semibold leading-6 text-muted-foreground">
                    /month
                  </span>
                </div>
                {tier.mostPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${
                    tier.mostPopular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                  }`}
                >
                  <a href={tier.id === "enterprise" ? "/contact" : "/auth/register"}>
                    {tier.cta}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 