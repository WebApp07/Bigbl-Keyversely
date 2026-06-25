import { prisma } from "@/db/prisma";
import { contactSchema } from "@/lib/validators";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = contactSchema.parse(body);

    await prisma.contactMessage.create({
      data: {
        name: validated.name,
        email: validated.email,
        orderNumber: validated.order ?? null,
        subject: validated.subject,
        message: validated.message,
      },
    });

    await resend.emails.send({
      from: "Keyversely <noreply@keyversely.com>",
      to: "support@keyversely.com",
      subject: `[Contact] ${validated.subject} — ${validated.name}`,
      text: `From: ${validated.name} (${validated.email})\nOrder: ${validated.order ?? "N/A"}\n\n${validated.message}`,
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
