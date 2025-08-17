"use client";
import { useState } from "react";

export default function InvoiceButton({ invoiceId }: { invoiceId: string }) {
  const [loading] = useState(false);

  const handleViewInvoice = () => {
    // Open in new tab
    window.open(`/api/invoices/${invoiceId}/download`, "_blank");
  };

  return (
    <button
      onClick={handleViewInvoice}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      disabled={loading}
    >
      {loading ? "Loading..." : "View/Download Invoice"}
    </button>
  );
}
