import { prisma } from "@/db/prisma";
import { feedbackSchema } from "@/lib/validators";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = feedbackSchema.parse(body);

    await prisma.feedback.create({
      data: {
        mood: validated.mood,
        rating: validated.rating,
        tags: validated.tags,
        message: validated.message ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for your feedback!",
    });
  } catch (error) {
    console.error("Feedback error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
