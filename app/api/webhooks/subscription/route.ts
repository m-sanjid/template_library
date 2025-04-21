import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import Stripe from "stripe";
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Missing stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  console.log("Processing webhook event:", event.type);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (!userId || !plan) {
          throw new Error("Missing userId or plan in session metadata");
        }

        // Create subscription in database
        await prisma.subscription.create({
          data: {
            userId,
            plan,
            status: "active",
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            currentPeriodStart: new Date(session.created * 1000),
            currentPeriodEnd: new Date(
              (session.created + 30 * 24 * 60 * 60) * 1000
            ), // 30 days from now
          },
        });

        console.log("Subscription created for user:", userId);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object;
        
        // Find subscription by stripeSubscriptionId
        const existingSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!existingSubscription) {
          console.error("Subscription not found:", subscription.id);
          return new NextResponse("Subscription not found", { status: 404 });
        }

        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log("Subscription updated:", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        
        // Find subscription by stripeSubscriptionId
        const existingSubscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!existingSubscription) {
          console.error("Subscription not found:", subscription.id);
          return new NextResponse("Subscription not found", { status: 404 });
        }

        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            status: "canceled",
          },
        });

        console.log("Subscription canceled:", subscription.id);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          // Find subscription by stripeSubscriptionId
          const existingSubscription = await prisma.subscription.findFirst({
            where: { stripeSubscriptionId: subscriptionId as string },
          });

          if (existingSubscription) {
            await prisma.subscription.update({
              where: { id: existingSubscription.id },
              data: {
                status: "active",
              },
            });
          }
        }

        console.log("Invoice payment succeeded:", invoice.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          // Find subscription by stripeSubscriptionId
          const existingSubscription = await prisma.subscription.findFirst({
            where: { stripeSubscriptionId: subscriptionId as string },
          });

          if (existingSubscription) {
            await prisma.subscription.update({
              where: { id: existingSubscription.id },
              data: {
                status: "past_due",
              },
            });
          }
        }

        console.log("Invoice payment failed:", invoice.id);
        break;
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}

export async function GET() {
  return new Response('Webhook endpoint is working', { status: 200 });
} 