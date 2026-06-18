// app/api/orders/track/route.ts
import { NextRequest, NextResponse } from "next/server";
import { trackOrder } from "@/lib/actions/order.actions";

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId || typeof orderId !== "string" || orderId.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid Order ID.",
        },
        { status: 400 },
      );
    }

    const result = await trackOrder(orderId.trim());

    return NextResponse.json(result, {
      status: result.success ? 200 : 404,
    });
  } catch (error: any) {
    console.error("Track order API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again.",
      },
      { status: 500 },
    );
  }
}
