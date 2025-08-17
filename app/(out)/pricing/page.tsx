"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Pricing from "@/components/Pricing";
import SectionHeader from "@/components/SectionHeader";

const PricingPage = () => {
  const { data: session } = useSession();
  const [isAnnual, setIsAnnual] = useState(true);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSubscribe = async (plan: string) => {
    if (!session) {
      toast.error("Please sign in to subscribe");
      return;
    }

    try {
      setIsLoading(plan);
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          isAnnual,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Failed to create subscription");
    } finally {
      setIsLoading(null);
    }
  };

  const handleToggle = () => {
    setIsAnnual((prev) => !prev);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <SectionHeader
        label="Pricing"
        title="Simple, Transparent Pricing"
        description="Choose the plan that's right for you"
        gradientText="PRICING"
        textHeight={240}
      />
      <Pricing
        isAnnual={isAnnual}
        setIsAnnual={handleToggle}
        isLoading={isLoading}
        handleSubscribe={handleSubscribe}
      />

      {/* FAQ Section */}
      <div className="mt-24">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Can I change plans later?
            </h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              What payment methods do you accept?
            </h3>
            <p className="text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for
              Enterprise plans.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              Is there a free trial?
            </h3>
            <p className="text-muted-foreground">
              Yes, all paid plans come with a 14-day free trial. No credit card
              required.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-semibold">
              What&apos;s your refund policy?
            </h3>
            <p className="text-muted-foreground">
              If you&apos;re not satisfied, we offer a 30-day money-back
              guarantee for all plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
