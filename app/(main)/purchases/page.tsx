"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  AlertCircle,
  ShoppingBag,
  FileText,
  Download,
  Mail,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import SectionHeader from "@/components/SectionHeader";
import { useSession } from "next-auth/react";
import { AnimatedButton } from "@/components/AnimatedButton";
import Link from "next/link";

interface Purchase {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  PurchaseItem: PurchaseItem[];
}

interface PurchaseItem {
  name: string;
  description: string;
  price: number | string;
  quantity: number;
}

const PurchaseCard = ({ purchase }: { purchase: Purchase }) => {
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return !isNaN(numericPrice) ? numericPrice.toFixed(2) : "0.00";
  };

  const handleGenerateInvoice = async (
    download: boolean = false,
    email: boolean = false
  ) => {
    try {
      if (email) {
        setIsSendingEmail(true);
      } else {
        setIsGeneratingInvoice(true);
      }

      const response = await axios.get(
        `/api/invoice/${purchase.id}/download${
          download ? "?download=true" : email ? "?email=true" : ""
        }`,
        {
          responseType: email ? "json" : "blob",
          validateStatus: (status) => status < 500,
        }
      );

      // Check if the response is an error message
      if (response.headers["content-type"]?.includes("application/json")) {
        const errorData =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;
        throw new Error(errorData.error || "Failed to process invoice");
      }

      if (email) {
        toast.success("Invoice sent to your email!");
        return;
      }

      if (download) {
        // Handle file download
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `invoice-${purchase.id.substring(0, 8)}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        // Open in new tab
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error handling invoice:", error);
      if (error instanceof Error) {
        toast.error(
          error.message || "Failed to process invoice. Please try again."
        );
      } else {
        toast.error("Failed to process invoice. Please try again.");
      }
    } finally {
      setIsGeneratingInvoice(false);
      setIsSendingEmail(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">
                Order #{purchase.id.substring(0, 8)}
              </CardTitle>
              <CardDescription>
                {formatDate(purchase.createdAt)}
              </CardDescription>
            </div>
            <Badge
              className={`${
                statusColors[purchase.status as keyof typeof statusColors]
              } px-3 py-1`}
            >
              {purchase.status.charAt(0).toUpperCase() +
                purchase.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purchase.PurchaseItem.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${formatPrice(item.price)}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Processing time: 1-2 business days</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold">
                ${formatPrice(purchase.totalPrice)}
              </p>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => handleGenerateInvoice(false)}
              disabled={isGeneratingInvoice || isSendingEmail}
            >
              <FileText className="w-4 h-4 mr-2" />
              {isGeneratingInvoice ? "Generating..." : "View Invoice"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => handleGenerateInvoice(true)}
              disabled={isGeneratingInvoice || isSendingEmail}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => handleGenerateInvoice(false, true)}
              disabled={isGeneratingInvoice || isSendingEmail}
            >
              <Mail className="w-4 h-4 mr-2" />
              {isSendingEmail ? "Sending..." : "Email Invoice"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="animate-pulse">
        <CardHeader>
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Skeleton className="h-8 flex-1" />
          </div>
        </CardFooter>
      </Card>
    ))}
  </div>
);

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const { data } = await axios.get("/api/purchases");
        setPurchases(data);
      } catch (error) {
        setError("Failed to load purchases. Please try again later.");
        console.error("Failed to fetch purchases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (!session) {
    return (
      <div className="container max-w-4xl mx-auto p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Oops! You&apos;re not logged in
          </h2>
          <p className="text-muted-foreground mb-4">
            Please log in to view your purchase history.
          </p>
          <AnimatedButton label="Login" to="/login" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto p-8">
        <SectionHeader
          label="Purchase History"
          title="Your Purchase History"
          description="View and manage your orders"
          gradientText="Purchase History"
          textHeight={160}
        />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl mx-auto p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (purchases.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto p-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No purchases yet</h2>
          <p className="text-gray-500 mb-4">
            Start shopping to see your purchase history here.
          </p>
          <Button asChild>
            <Link href="/templates">Browse Templates</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-8">
      <SectionHeader
        label="Purchase History"
        title="Your Purchase History"
        description="View and manage your orders"
        gradientText="Purchase"
        textHeight={160}
      />
      <div className="space-y-6">
        {purchases.map((purchase) => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
      </div>
    </div>
  );
};

export default PurchasesPage;
