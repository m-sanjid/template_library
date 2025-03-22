import { jsPDF } from "jspdf";
import nodemailer from "nodemailer";
import { COMPANY_INFO } from "./config";

interface PurchaseItem {
	name: string;
	quantity: number;
	price: number | string;
}

interface User {
	name?: string | null;
	email?: string;
}

interface Purchase {
	id: string;
	invoiceNumber?: string;
	createdAt: string | Date;
	user?: User;
	customerName?: string | null;
	customerEmail?: string | null;
	PurchaseItem?: PurchaseItem[];
	totalPrice: number;
}

export async function generateInvoicePdf(purchase: Purchase): Promise<Buffer> {
	try {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.width;
		const pageHeight = doc.internal.pageSize.height;
		const margin = 20;
		const contentWidth = pageWidth - 2 * margin;

		// Company information
		const COMPANY_INFO = {
			logo: "COMPANY LOGO",
			name: "Your Template Store",
			address: "123 Template Street",
			city: "Template City, TC 12345",
			email: "support@yourtemplatestore.com",
			phone: "(555) 123-4567",
			website: "www.yourtemplatestore.com",
		};

		// Colors
		const primaryColor: [number, number, number] = [41, 128, 185]; // Blue
		const secondaryColor: [number, number, number] = [52, 73, 94]; // Dark blue
		const lightGray: [number, number, number] = [245, 245, 245];
		const white: [number, number, number] = [255, 255, 255];
		const black: [number, number, number] = [0, 0, 0];
		// Set default font
		doc.setFont("helvetica", "normal");

		// Header section with gradient effect
		doc.setFillColor(...primaryColor);
		doc.rect(0, 0, pageWidth, 40, "F");

		// Add subtle gradient overlay
		doc.setFillColor(...secondaryColor);
		doc.setGState(new (doc.GState as any)({ opacity: 0.3 }));
		doc.rect(pageWidth / 2, 0, pageWidth / 2, 40, "F");
		doc.setGState(new (doc.GState as any)({ opacity: 1.0 }));

		// Company logo/name
		doc.setTextColor(...white);
		doc.setFontSize(24);
		doc.setFont("helvetica", "bold");
		doc.text(COMPANY_INFO.name, margin, 25);

		// Divider line
		doc.setDrawColor(...primaryColor);
		doc.setLineWidth(0.5);
		doc.line(margin, 45, pageWidth - margin, 45);

		// Company and invoice info in two columns
		const leftCol = margin;
		const rightCol = pageWidth / 2 + 10;

		// Left column: Company info
		doc.setTextColor(...black);
		doc.setFontSize(10);
		doc.setFont("helvetica", "normal");
		doc.text("FROM", leftCol, 60);
		doc.setFont("helvetica", "bold");
		doc.text(COMPANY_INFO.name, leftCol, 70);
		doc.setFont("helvetica", "normal");
		doc.text(COMPANY_INFO.address, leftCol, 80);
		doc.text(COMPANY_INFO.city, leftCol, 90);
		doc.text(COMPANY_INFO.email, leftCol, 100);
		doc.text(COMPANY_INFO.phone, leftCol, 110);

		// Right column: Invoice details
		doc.setFont("helvetica", "bold");
		doc.setFontSize(20);
		doc.setTextColor(...primaryColor);
		doc.text("INVOICE", rightCol, 60);
		doc.setFont("helvetica", "normal");
		doc.setTextColor(...black);
		doc.setFontSize(10);

		const invoiceDetailY = 75;
		const invoiceDetailGap = 10;

		// Modern key-value display with dot leaders
		const displayKeyValue = (key: string, value: string, y: number) => {
			doc.setFont("helvetica", "normal");
			doc.text(key, rightCol, y);
			doc.setFont("helvetica", "bold");
			doc.text(value, pageWidth - margin, y, { align: "right" });
		};

		displayKeyValue(
			"Invoice Number:",
			purchase.invoiceNumber || `INV-${purchase.id.substring(0, 8)}`,
			invoiceDetailY,
		);
		displayKeyValue(
			"Date:",
			new Date(purchase.createdAt).toLocaleDateString(),
			invoiceDetailY + invoiceDetailGap,
		);
		displayKeyValue(
			"Order ID:",
			purchase.id.substring(0, 8),
			invoiceDetailY + invoiceDetailGap * 2,
		);
		displayKeyValue(
			"Payment Status:",
			"Paid",
			invoiceDetailY + invoiceDetailGap * 3,
		);

		// Customer info section with rounded corners (simulated)
		const customerY = 135;
		doc.setFillColor(...lightGray);
		doc.roundedRect(margin, customerY, contentWidth, 40, 3, 3, "F");

		doc.setFont("helvetica", "bold");
		doc.setFontSize(12);
		doc.setTextColor(...secondaryColor);
		doc.text("BILL TO", margin + 10, customerY + 15);

		doc.setFont("helvetica", "normal");
		doc.setFontSize(10);
		doc.setTextColor(...black);
		doc.text(
			`${purchase.user?.name || purchase.customerName || "Customer"}`,
			margin + 10,
			customerY + 25,
		);
		doc.text(
			`${purchase.user?.email || purchase.customerEmail || ""}`,
			margin + 10,
			customerY + 35,
		);

		// Table header with modern styling
		const tableTop = 185;
		doc.setFillColor(...secondaryColor);
		doc.roundedRect(margin, tableTop, contentWidth, 12, 2, 2, "F");

		doc.setTextColor(...white);
		doc.setFontSize(10);
		doc.setFont("helvetica", "bold");

		// Table header columns
		const col1 = margin + 10; // Description
		const col2 = margin + contentWidth * 0.6; // Quantity
		const col3 = margin + contentWidth * 0.75; // Unit Price
		const col4 = margin + contentWidth * 0.9; // Amount

		doc.text("Description", col1, tableTop + 8);
		doc.text("Qty", col2, tableTop + 8);
		doc.text("Price", col3, tableTop + 8);
		doc.text("Amount", col4, tableTop + 8);

		// Table rows with zebra striping and improved alignment
		let currentY = tableTop + 20;
		let subtotal = 0;

		if (Array.isArray(purchase.PurchaseItem)) {
			purchase.PurchaseItem.forEach((item: PurchaseItem, index: number) => {
				if (index % 2 === 0) {
					doc.setFillColor(...lightGray);
					doc.roundedRect(margin, currentY - 6, contentWidth, 16, 1, 1, "F");
				}

				// Calculate amount
				const amount = item.quantity * parseFloat(item.price.toString());
				subtotal += amount;

				// Add row content
				doc.setTextColor(...black);
				doc.setFont("helvetica", "normal");
				doc.text(item.name, col1, currentY);

				// Right-align numeric values
				doc.text(item.quantity.toString(), col2, currentY, { align: "left" });
				doc.text(
					`$${parseFloat(item.price.toString()).toFixed(2)}`,
					col3,
					currentY,
					{ align: "left" },
				);
				doc.text(`$${amount.toFixed(2)}`, col4, currentY, { align: "left" });

				currentY += 18;
			});
		}

		// Add subtle separator line before totals
		doc.setDrawColor(...primaryColor);
		doc.setLineWidth(0.5);
		doc.line(margin, currentY, pageWidth - margin, currentY);
		currentY += 15;

		// Totals section with right alignment and cleaner presentation
		const totalsStartX = pageWidth - margin - 130;
		const totalsEndX = pageWidth - margin;
		const displayTotal = (
			label: string,
			value: number,
			isFinal: boolean = false,
		) => {
			if (isFinal) {
				doc.setFont("helvetica", "bold");
				doc.setFontSize(12);
				doc.setTextColor(...primaryColor);
			} else {
				doc.setFont("helvetica", "normal");
				doc.setFontSize(10);
				doc.setTextColor(...black);
			}

			doc.text(label, totalsStartX, currentY);
			doc.text(`$${value.toFixed(2)}`, totalsEndX, currentY, {
				align: "right",
			});
			currentY += 15;
		};

		displayTotal("Subtotal:", subtotal);

		// Add tax (if applicable)
		const tax = subtotal * 0.1; // 10% tax
		displayTotal("Tax (10%):", tax);

		// Bold total with highlight
		const total = subtotal + tax;
		doc.setFillColor(...lightGray);
		doc.roundedRect(totalsStartX - 10, currentY - 5, 140, 20, 3, 3, "F");
		displayTotal("TOTAL:", total, true);

		// Payment info and terms
		currentY += 10;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(...secondaryColor);
		doc.text("Payment Information", margin, currentY);
		currentY += 10;

		doc.setFont("helvetica", "normal");
		doc.setTextColor(...black);
		doc.text("All payments were processed through Stripe.", margin, currentY);
		currentY += 20;

		// Terms and conditions
		doc.setFont("helvetica", "bold");
		doc.setTextColor(...secondaryColor);
		doc.text("Terms & Conditions", margin, currentY);
		currentY += 10;

		doc.setFont("helvetica", "normal");
		doc.setTextColor(...black);
		doc.setFontSize(8);
		const terms =
			"Thank you for your purchase. All items are non-refundable once downloaded. " +
			"Please contact our support team if you have any questions.";
		doc.text(terms, margin, currentY, {
			maxWidth: contentWidth,
			align: "left",
		});

		// Modern footer
		const footerY = pageHeight - 25;
		doc.setDrawColor(...primaryColor);
		doc.setLineWidth(0.5);
		doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

		doc.setTextColor(...secondaryColor);
		doc.setFontSize(8);
		doc.text("Thank you for your business!", pageWidth / 2, footerY, {
			align: "center",
		});
		doc.text(
			`${COMPANY_INFO.website} | ${COMPANY_INFO.email}`,
			pageWidth / 2,
			footerY + 10,
			{ align: "center" },
		);

		// Add page numbers
		doc.setFont("helvetica", "italic");
		doc.setFontSize(8);
		doc.text(`Page 1 of 1`, pageWidth - margin, pageHeight - 10, {
			align: "right",
		});

		// Convert to Buffer
		const pdfBytes = doc.output("arraybuffer");
		return Buffer.from(pdfBytes);
	} catch (error) {
		console.error("Error generating PDF:", error);
		throw error;
	}
}

export async function sendInvoiceEmail({
	toEmail,
	pdfBuffer,
	filename,
	purchase,
}: {
	toEmail: string;
	pdfBuffer: Buffer;
	filename: string;
	purchase: Purchase;
}) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT) || 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});

	const subject = `Your Invoice #${purchase.invoiceNumber || `INV-${purchase.id.substring(0, 8)}`}`;

	const plainText = `Thank you for your purchase!

Please find your invoice attached to this email.

Order ID: ${purchase.id}
Amount: $${purchase.totalPrice.toFixed(2)}
Date: ${new Date(purchase.createdAt).toLocaleDateString()}

If you have any questions, please contact our support team.`;

	const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2980b9;">Thank you for your purchase!</h2>
      <p>Your invoice is attached to this email.</p>
      <div style="margin: 20px 0; padding: 15px; border: 1px solid #eee; border-radius: 5px; background-color: #f9f9f9;">
        <p><strong>Order ID:</strong> ${purchase.id}</p>
        <p><strong>Amount:</strong> $${purchase.totalPrice.toFixed(2)}</p>
        <p><strong>Date:</strong> ${new Date(purchase.createdAt).toLocaleDateString()}</p>
      </div>
      <p>If you have any questions, please contact our support team.</p>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #888; font-size: 12px;">
        <a href="${COMPANY_INFO.website}" style="color: #2980b9; text-decoration: none;">${COMPANY_INFO.name}</a>
        <p>${COMPANY_INFO.email} | ${COMPANY_INFO.phone}</p>
        <p>${COMPANY_INFO.address}</p>
        <div>
          <a href="${COMPANY_INFO.social.twitter}" style="margin-right: 10px;">Twitter</a>
          <a href="${COMPANY_INFO.social.github}" style="margin-right: 10px;">GitHub</a>
          <a href="${COMPANY_INFO.social.linkedin}">LinkedIn</a>
        </div>
      </div>
    </div>
  `;

	await transporter.sendMail({
		from: `"${COMPANY_INFO.name}" <${process.env.SMTP_FROM || "noreply@templatelibrary.com"}>`,
		to: toEmail,
		subject,
		text: plainText,
		html: htmlContent,
		attachments: [
			{
				filename,
				content: pdfBuffer,
				contentType: "application/pdf",
			},
		],
	});
}
