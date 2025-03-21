import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Subscription {
  id: string;
  plan: string;
  status: string;
  currentPeriodEnd: Date;
}

export function useSubscription() {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/subscription/current");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch subscription");
        }

        setSubscription(data.subscription);
      } catch (err) {
        console.error("Error fetching subscription:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchSubscription();
    } else {
      setSubscription(null);
      setIsLoading(false);
    }
  }, [session]);

  const cancelSubscription = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/subscription/cancel", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel subscription");
      }

      // Refetch subscription after cancellation
      const updatedResponse = await fetch("/api/subscription/current");
      const data = await updatedResponse.json();

      if (!updatedResponse.ok) {
        throw new Error(data.message || "Failed to fetch updated subscription");
      }

      setSubscription(data.subscription);
    } catch (err) {
      console.error("Error canceling subscription:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscription,
    isLoading,
    error,
    cancelSubscription,
  };
} 