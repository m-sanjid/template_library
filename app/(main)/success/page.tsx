"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams.get("purchaseId");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchase, setPurchase] = useState<any>(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    // If no purchaseId is provided, redirect to home
    if (!purchaseId) {
      router.push("/");
      return;
    }

    const checkPurchaseStatus = async () => {
      try {
        console.log(`Checking purchase status (attempt ${pollCount + 1})...`);
        const response = await fetch(`/api/purchases/${purchaseId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch purchase status");
        }

        const data = await response.json();
        console.log("Purchase data:", data);
        setPurchase(data);

        if (data.status === "completed") {
          console.log("Purchase is completed, will redirect soon");
          setLoading(false);
          // Purchase is complete, redirect to purchases page after a short delay
          setTimeout(() => {
            router.push("/purchases");
          }, 3000);
        } else {
          console.log(`Purchase status is still: ${data.status}`);
          // Increment poll count
          setPollCount((prev) => prev + 1);

          // If we've tried 10 times (20 seconds) and still not completed,
          // stop polling but allow manual navigation
          if (pollCount >= 10) {
            console.log("Max polling attempts reached");
            setLoading(false);
          } else {
            // If not completed yet, poll again in 2 seconds
            setTimeout(checkPurchaseStatus, 2000);
          }
        }
      } catch (err) {
        console.error("Error checking purchase status:", err);
        setError("Error checking purchase status");
        setLoading(false);
      }
    };

    checkPurchaseStatus();
  }, [purchaseId, router, pollCount]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-green-600">
          Payment Successful!
        </h1>

        <p className="text-center text-gray-700">
          Thank you for your purchase. Your order has been received.
        </p>

        {loading ? (
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-t-2 border-green-500 rounded-full animate-spin"></div>
            <p>Processing your order...</p>
            <p className="text-sm text-gray-500">
              You will be redirected to your purchases shortly.
            </p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            {error}
            <div className="mt-4">
              <Link
                href="/purchases"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                View your purchases
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold">
              {purchase?.status === "completed"
                ? "Order processed successfully!"
                : "Your payment has been received."}
            </p>

            {purchase?.status === "completed" ? (
              <p className="text-sm text-gray-500 mt-2">
                You will be redirected to your purchases in a moment...
              </p>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-3">
                  We're still processing your order. Click below to view your
                  purchases.
                </p>
                <Link
                  href="/purchases"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  View your purchases
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="pt-4 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
