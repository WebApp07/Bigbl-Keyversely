import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  order: z.string().optional().nullable(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name: validated.name,
        email: validated.email,
        orderNumber: validated.order ?? null,
        subject: validated.subject,
        message: validated.message,
      },
    });

    // Send email notification
    await resend.emails.send({
      from: "Keyversely <noreply@keyversely.com>",
      to: "support@keyversely.com",
      subject: `[Contact] ${validated.subject} — ${validated.name}`,
      text: `From: ${validated.name} (${validated.email})\nOrder: ${validated.order ?? "N/A"}\n\n${validated.message}`,
      // You can also add HTML version later
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
