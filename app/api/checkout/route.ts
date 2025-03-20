import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession, Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-02-24.acacia",
});

interface CheckoutItem {
	name: string;
	description: string;
	price: number;
	quantity: number;
}

const getUserFromSession = async (session: Session | null) => {
	if (!session || !session.user?.email) throw new Error("Unauthorized");
	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});
	if (!user) throw new Error("User not found");
	return user;
};

export async function POST(req: NextRequest) {
	try {
		// Authentication
		const session = await getServerSession(authOptions);
		const user = await getUserFromSession(session);

		const { items }: { items: CheckoutItem[] } = await req.json();
		if (!items || items.length === 0) {
			return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
		}

		console.log("Received items:", items);

		// Save or Update Cart Items using Upsert
		await Promise.all(
			items.map(async (item) =>
				prisma.cartItem.upsert({
					where: { userId_name: { userId: user.id, name: item.name } }, // Unique constraint
					update: { quantity: { increment: item.quantity } },
					create: {
						name: item.name,
						description: item.description,
						price: item.price,
						quantity: item.quantity,
						userId: user.id,
					},
				}),
			),
		);

		console.log("Cart items saved successfully.");

		// Create Purchase
		const totalPrice = items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0,
		);
		const purchase = await prisma.purchase.create({
			data: {
				userId: user.id,
				totalPrice,
				status: "pending",
				PurchaseItem: {
					create: items.map((item) => ({
						name: item.name,
						description: item.description,
						price: item.price,
						quantity: item.quantity,
					})),
				},
			},
		});

		console.log("Purchase created with ID:", purchase.id);

		// Create Stripe Checkout session
		const sessionData = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: items.map((item) => ({
				price_data: {
					currency: "usd",
					product_data: {
						name: item.name,
						description: item.description,
					},
					unit_amount: item.price * 100,
				},
				quantity: item.quantity,
			})),
			mode: "payment",
			success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?purchaseId=${purchase.id}`,
			cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
			metadata: {
				purchaseId: purchase.id,
			},
		});

		console.log("Stripe session created:", sessionData.url);
		return NextResponse.json({ url: sessionData.url });
	} catch (error) {
		console.error("Error creating checkout session:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error ? error.message : "An unknown error occurred",
			},
			{ status: 500 },
		);
	}
}
