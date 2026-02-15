import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { dbConnect, collections } from "@/lib/dbConnect";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const url = new URL(req.url, "http://localhost");
  const orderId = url.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  const orderCollection = dbConnect(collections.ORDER);
  const result = await orderCollection.deleteOne({
    _id: new ObjectId(orderId),
    email: session.user.email,
  });
  if (result.deletedCount === 1) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 404 });
  }
}

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ orders: [] });
  }
  const orderCollection = dbConnect(collections.ORDER);
  const orders = await orderCollection
    .find({ email: session.user.email })
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json({ orders });
}
