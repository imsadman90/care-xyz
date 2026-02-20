import { collections, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const stripeSessionId = searchParams.get("stripeSessionId");

  try {
    const collection = dbConnect(collections.ORDER);
    let query = {};
    if (stripeSessionId) {
      query.stripeSessionId = stripeSessionId;
    } else if (email) {
      query.customerEmail = email;
    } else {
      return NextResponse.json(
        { error: "Email or stripeSessionId is required" },
        { status: 400 },
      );
    }
    const orders = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
};
