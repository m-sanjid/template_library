"use client";
import { useState } from "react";

type PurchaseItemProps = {
  purchase: {
    id: string;
    status: string;
    totalPrice: number;
    createdAt: Date;
    PurchaseItem: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
    }>;
  };
};

const PurchaseListItem = ({ purchase }: PurchaseItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Guard clause for when purchase is undefined
  if (!purchase) {
    return <div className="bg-white rounded-lg shadow-md p-6">Loading...</div>;
  }

  const viewInvoice = () => {
    setIsLoading(true);
    // Open in new tab - this will display the PDF inline
    window.open(`/api/invoice/${purchase.id}`, "_blank");
    setIsLoading(false);
  };

  const downloadInvoice = () => {
    setIsLoading(true);
    // Add download parameter
    window.open(`/api/invoice/${purchase.id}?download=true`, "_blank");
    setIsLoading(false);
  };

  // Helper function to safely access purchase ID
  const getOrderId = () => {
    return purchase?.id ? purchase.id.substring(0, 8) : "N/A";
  };

  // Helper function to safely format the date
  const getFormattedDate = () => {
    if (!purchase?.createdAt) return "N/A";

    return new Date(purchase.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Order #{getOrderId()}</p>
            <p className="text-sm text-gray-500">{getFormattedDate()}</p>
          </div>
          <div className="flex items-center">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${purchase.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : purchase.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
            >
              {purchase.status
                ? purchase.status.charAt(0).toUpperCase() +
                purchase.status.slice(1)
                : "Unknown"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 my-4 pt-4">
          {purchase.PurchaseItem?.map((item, index) => (
            <div key={item.id || index} className="flex justify-between py-2">
              <div className="flex-1">
                <p className="font-medium text-gray-800">
                  {item.name || "Unnamed Item"}
                </p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity || 0}
                </p>
              </div>
              <p className="text-gray-700">
                ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <div>
            <p className="font-bold text-lg text-gray-800">
              Total: $
              {(purchase.totalPrice !== undefined
                ? parseFloat(purchase.totalPrice.toString())
                : 0
              ).toFixed(2)}
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={viewInvoice}
              disabled={isLoading || !purchase.id}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View Invoice
            </button>

            <button
              onClick={downloadInvoice}
              disabled={isLoading || !purchase.id}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseListItem;
