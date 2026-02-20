import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const { id } = await params;
  const body = await request.json();

  try {
    const collection = dbConnect(collections.ORDER);
    // Only allow status update to 'paid' (or other allowed values)
    if (
      body.status === "paid" ||
      body.status === "unpaid" ||
      body.status === "cancelled"
    ) {
      await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: body.status } },
      );
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 },
    );
  }
};
