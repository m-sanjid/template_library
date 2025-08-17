"use client";

import { useProtectedRoute } from "@/hooks/use-protected-route";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

const ProPage = () => {
  const { isLoading, hasRequiredSubscription } = useProtectedRoute({
    requiresSubscription: true,
    requiredFeature: "Pro Features",
  });

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="flex h-64 items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!hasRequiredSubscription) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-8 text-4xl font-bold">Pro Features</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Advanced Analytics</h2>
            <p className="text-muted-foreground mb-6">
              Get detailed insights into your template usage and performance
              metrics.
            </p>
            <Button>View Analytics</Button>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Custom Templates</h2>
            <p className="text-muted-foreground mb-6">
              Create and save your own custom templates for future use.
            </p>
            <Button>Create Template</Button>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">Priority Support</h2>
            <p className="text-muted-foreground mb-6">
              Get priority access to our support team and faster response times.
            </p>
            <Button>Contact Support</Button>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-2xl font-semibold">API Access</h2>
            <p className="text-muted-foreground mb-6">
              Access our API to integrate templates into your own applications.
            </p>
            <Button>View Documentation</Button>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ProPage;
