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
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!hasRequiredSubscription) {
    return null; // The hook will handle the redirect
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold mb-8">Pro Features</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Advanced Analytics</h2>
            <p className="text-muted-foreground mb-6">
              Get detailed insights into your template usage and performance
              metrics.
            </p>
            <Button>View Analytics</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Custom Templates</h2>
            <p className="text-muted-foreground mb-6">
              Create and save your own custom templates for future use.
            </p>
            <Button>Create Template</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Priority Support</h2>
            <p className="text-muted-foreground mb-6">
              Get priority access to our support team and faster response times.
            </p>
            <Button>Contact Support</Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">API Access</h2>
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