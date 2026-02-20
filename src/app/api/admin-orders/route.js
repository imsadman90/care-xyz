import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session:", session);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderCol = dbConnect(collections.ORDER);

    // First, check if there are any orders at all
    const orderCount = await orderCol.countDocuments();
    console.log("Total orders in database:", orderCount);

    // Get simple orders first to debug
    const simpleOrders = await orderCol.find({}).toArray();
    console.log("Simple orders:", simpleOrders);

    // Aggregate with preserveNullAndEmptyArrays to not lose orders
    const orders = await orderCol
      .aggregate([
        {
          $lookup: {
            from: collections.USERS,
            localField: "user",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $unwind: {
            path: "$userDetails",
            preserveNullAndEmptyArrays: true, // Keep orders even if no user found
          },
        },
        {
          $lookup: {
            from: collections.SERVICES,
            localField: "service",
            foreignField: "_id",
            as: "serviceDetails",
          },
        },
        {
          $unwind: {
            path: "$serviceDetails",
            preserveNullAndEmptyArrays: true, // Keep orders even if no service found
          },
        },
        {
          $project: {
            _id: 1,
            user: "$userDetails",
            service: "$serviceDetails",
            status: 1,
            adminFeedback: 1,
            createdAt: 1,
          },
        },
      ])
      .toArray();

    console.log("Aggregated orders:", orders);
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error in admin-orders GET:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId, action, feedback } = await req.json();
    const orderCol = dbConnect(collections.ORDER);
    const { ObjectId } = require("mongodb");

    const order = await orderCol.findOne({ _id: new ObjectId(orderId) });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    let update = {};
    if (action === "approve") update.status = "approved";
    if (action === "reject") update.status = "rejected";
    if (action === "feedback") update.adminFeedback = feedback;

    await orderCol.updateOne({ _id: new ObjectId(orderId) }, { $set: update });

    const updatedOrder = await orderCol.findOne({ _id: new ObjectId(orderId) });
    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error in admin-orders PATCH:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
