import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const { id } = await params;
  const body = await request.json();

  try {
    const collection = dbConnect(collections.ORDER);
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

// ✅ DELETE handler — permanently removes the order from MongoDB
export const DELETE = async (request, { params }) => {
  const { id } = await params;

  try {
    const collection = dbConnect(collections.ORDER);

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 },
    );
  }
};
