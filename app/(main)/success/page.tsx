"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, Mail, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function SuccessPage() {
  const searchParams = useSearchParams();
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
      const response = await axios.get(`/api/invoice/${purchase.id}/download?download=true`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${purchase.id.substring(0, 8)}.pdf`);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your order has been successfully processed.
          </p>
        </motion.div>

        {purchase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order #{purchase.id.substring(0, 8)}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(purchase.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${parseFloat(purchase.totalPrice).toFixed(2)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Amount</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {purchase.PurchaseItem.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadInvoice}
                className="flex-1"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Button
                onClick={handleEmailInvoice}
                className="flex-1"
                variant="outline"
              >
                <Mail className="w-4 h-4 mr-2" />
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
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              What's Next?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your purchased items are now available in your account. You can access them at any time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link href="/dashboard">
                  <Package className="w-4 h-4 mr-2" />
                  View My Purchases
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/templates">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Browse More Templates
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
