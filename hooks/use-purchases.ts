import { useState, useEffect } from 'react';
import axios from 'axios';
import { Purchase } from '@prisma/client';
import { useSession } from 'next-auth/react';

export function usePurchases() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPurchases = async () => {
      // Don't fetch if not authenticated
      if (status === 'unauthenticated') {
        setIsLoading(false);
        return;
      }

      // Wait for session to be loaded
      if (status === 'loading') {
        return;
      }

      try {
        const { data } = await axios.get("/api/purchases");
        setPurchases(data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setError("Please sign in to view your purchases");
        } else {
          setError("Failed to load purchases. Please try again later.");
          console.error("Failed to fetch purchases:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, [status]);

  const isPurchased = (templateId: string) => {
    return purchases.some(purchase => purchase.id === templateId);
  };

  return { purchases, isLoading, error, isPurchased };
}