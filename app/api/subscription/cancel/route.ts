import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: "active",
      },
    });

    if (!subscription?.stripeSubscriptionId) {
      return new NextResponse("No active subscription found", { status: 404 });
    }

    // Cancel subscription in Stripe
    await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);

    // Update subscription status in database
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: "canceled" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
