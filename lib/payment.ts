import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function getPaymentDetails(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const customer = await stripe.customers.retrieve(
      paymentIntent.customer as string,
    );

    return { paymentIntent, customer };
  } catch (error) {
    console.error("Error fetching payment details:", error);
    throw error;
  }
}
