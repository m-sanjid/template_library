import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-02-24.acacia",
});

export async function POST(req: NextRequest) {
	const payload = await req.text();
	const sig = req.headers.get("stripe-signature");

	if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
		return NextResponse.json(
			{ error: "Missing Stripe signature" },
			{ status: 400 },
		);
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			payload,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET,
		);
	} catch (error) {
		console.error("Webhook signature verification failed:", error);
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	console.log("Received event:", event.type);

	// Handle Checkout Success
	if (event.type === "checkout.session.completed") {
		const session = event.data.object as Stripe.Checkout.Session;
		const purchaseId = session.metadata?.purchaseId;

		if (!purchaseId) {
			console.error("Purchase ID missing from session metadata");
			return NextResponse.json(
				{ error: "Purchase ID missing" },
				{ status: 400 },
			);
		}

		try {
			// Fetch the purchase with all necessary relations
			const purchase = await prisma.purchase.findUnique({
				where: { id: purchaseId },
				include: {
					PurchaseItem: true,
					user: true,
				},
			});

			if (!purchase) {
				throw new Error(`Purchase not found: ${purchaseId}`);
			}

			await prisma.purchase.update({
				where: { id: purchaseId },
				data: {
					status: "completed",
					paymentIntentId: session.payment_intent as string,
					invoiceGenerated: true,
				},
			});

			// Generate invoice number
			const invoiceNumber = `INV-${Date.now()}-${purchase.id.substring(0, 8)}`;

			// Create invoice record
			const invoice = await prisma.invoice.create({
				data: {
					purchaseId: purchaseId,
					userId: purchase.userId,
					invoiceNumber,
					amount: session.amount_total! / 100,
					currency: session.currency!,
					items: JSON.stringify(purchase.PurchaseItem),
					issueDate: new Date(),
					status: "paid",
					paymentIntentId: session.payment_intent as string,
				},
			});

			console.log("Invoice created successfully:", invoice.id);

			// Clear the user's cart after successful payment
			await prisma.cartItem.deleteMany({
				where: { userId: purchase.userId },
			});

			console.log("Purchase completed successfully:", purchase.id);
		} catch (error) {
			console.error("Error processing checkout completion:", error);
			// Log the full error details
			if (error instanceof Error) {
				console.error("Error details:", error.message);
				console.error("Error stack:", error.stack);
			}
			return NextResponse.json(
				{ error: "Failed to process checkout completion" },
				{ status: 500 },
			);
		}
	}

	return NextResponse.json({ received: true });
}
