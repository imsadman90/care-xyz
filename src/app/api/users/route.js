import { dbConnect, collections } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userCol = dbConnect(collections.USERS);
    const users = await userCol.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
