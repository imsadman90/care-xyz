import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Accept all order fields from the request body
    const orderData = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: orderData.service,
              description: `${orderData.duration} on ${orderData.date} at ${orderData.location}`,
            },
            unit_amount: Math.round(orderData.amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    });

    // Pass all order fields to createOrder
    const { createOrder } = require("@/actions/server/order");
    // Always use the authenticated user's email for customerEmail
    const { getServerSession } = require("next-auth");
    const { authOptions } = require("@/lib/authOptions");
    const userSession = await getServerSession(authOptions);
    await createOrder({
      ...orderData,
      stripeSessionId: session.id,
      customerEmail: userSession?.user?.email || orderData.email || "unknown",
      amount: session.amount_total
        ? session.amount_total / 100
        : orderData.amount,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
