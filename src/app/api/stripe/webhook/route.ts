import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const auditId = session.metadata?.auditId;
      // In production: mark the audit as paid in your database
      console.log(`Payment successful for audit: ${auditId}`);
      break;
    }
    case "customer.subscription.deleted": {
      // Handle subscription cancellation
      console.log("Subscription canceled");
      break;
    }
  }

  return NextResponse.json({ received: true });
}
