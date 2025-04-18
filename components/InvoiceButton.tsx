"use client";
import { useState } from "react";

export default function InvoiceButton({
	invoiceId,
}: {
	invoiceId: string;
}) {
	const [loading] = useState(false);

	const handleViewInvoice = () => {
		// Open in new tab
		window.open(`/api/invoices/${invoiceId}/download`, "_blank");
	};

	return (
		<button
			onClick={handleViewInvoice}
			className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
			disabled={loading}
		>
			{loading ? "Loading..." : "View/Download Invoice"}
		</button>
	);
}
