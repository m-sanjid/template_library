"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Mail } from "lucide-react";
import axios from "axios";
import { AnimatedButton } from "@/components/AnimatedButton";

export interface PurchaseItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [purchase, setPurchase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const purchaseId = searchParams.get("purchaseId");
    if (purchaseId) {
      fetchPurchaseDetails(purchaseId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchPurchaseDetails = async (purchaseId: string) => {
    try {
      const response = await axios.get(`/api/purchases/${purchaseId}`);
      setPurchase(response.data);
    } catch (error) {
      console.error("Error fetching purchase details:", error);
      setError("Failed to load purchase details");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!purchase) return;
    try {
      const response = await axios.get(
        `/api/invoice/${purchase.id}/download?download=true`,
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `invoice-${purchase.id.substring(0, 8)}.pdf`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  const handleEmailInvoice = async () => {
    if (!purchase) return;
    try {
      await axios.get(`/api/invoice/${purchase.id}/download?email=true`);
      // Show success message
    } catch (error) {
      console.error("Error emailing invoice:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Something went wrong
          </h2>
          <p className="mb-4 text-neutral-600">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
            Thank You for Your Purchase!
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300">
            Your order has been successfully processed.
          </p>
        </motion.div>

        {purchase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-800"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                  Order #{purchase.id.substring(0, 8)}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  ${parseFloat(purchase.totalPrice).toFixed(2)}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                  Total Amount
                </p>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              {purchase.PurchaseItem.map(
                (item: PurchaseItem, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-neutral-900 dark:text-white">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                ),
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={handleDownloadInvoice}
                className="flex-1"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              <Button
                onClick={handleEmailInvoice}
                className="flex-1"
                variant="outline"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Invoice
              </Button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="mb-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
              What&apos;s Next?
            </h3>
            <p className="mb-4 text-neutral-600 dark:text-neutral-300">
              Your purchased items are now available in your account. You can
              access them at any time.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <AnimatedButton
                label="View My Purchases"
                className="bg-primary text-secondary rounded-full border"
                to="/dashboard"
              />
              <AnimatedButton
                label="Browse More Templates"
                className="bg-primary text-secondary rounded-full border"
                to="/templates"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
