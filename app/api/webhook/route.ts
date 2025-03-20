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
			// Update purchase status to completed
			const purchase = await prisma.purchase.update({
				where: { id: purchaseId },
				data: { status: "completed" },
			});

			console.log("Purchase completed successfully:", purchase.id);

			// Clear the user's cart after successful payment
			await prisma.cartItem.deleteMany({
				where: { userId: purchase.userId },
			});

			console.log("Cart cleared for user:", purchase.userId);
		} catch (error) {
			console.error("Error updating purchase status:", error);
			return NextResponse.json(
				{ error: "Failed to update purchase" },
				{ status: 500 },
			);
		}
	}

	return NextResponse.json({ received: true });
}
