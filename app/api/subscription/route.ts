import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { PRICING } from "@/lib/config";
import prisma from "@/lib/prisma";

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { plan, isAnnual } = await req.json();
    const pricingPlan = Object.entries(PRICING).find(
      ([_, p]) => p.name === plan
    )?.[1];

    if (!pricingPlan) {
      return new NextResponse("Invalid plan", { status: 400 });
    }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: "active",
      },
    });

    if (existingSubscription) {
      return new NextResponse("User already has an active subscription", {
        status: 400,
      });
    }

    // Calculate price based on billing interval
    const unitAmount = isAnnual
      ? Math.round(pricingPlan.price * 0.8 * 12 * 100) // 20% discount for annual
      : pricingPlan.price * 100;

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email!,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pricingPlan.name,
              description: `${pricingPlan.name} Plan Subscription`,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: isAnnual ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${DOMAIN}/settings?success=true`,
      cancel_url: `${DOMAIN}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
        plan: pricingPlan.name,
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
    });

    console.log("Created Stripe checkout session:", stripeSession.id);
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Subscription error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 