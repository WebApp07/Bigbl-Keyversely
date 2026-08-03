import { Resend } from "resend";
import { SENDER_EMAIL, APP_NAME } from "@/lib/constants";
import { Order } from "@/types";
import dotenv from "dotenv";
import ResetPasswordEmail from "./reset-password";

dotenv.config();

import PurchaseReceiptEmail from "./purchase-receipt";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  const email = order.user ? order.user.email : order.shippingAddress.email;
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: email,
    subject: `Order Confirmation ${order.id}`,
    react: <PurchaseReceiptEmail order={order} />,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  token: string,
) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: email,
    subject: "Reset your password",
    react: <ResetPasswordEmail name={name} resetUrl={resetUrl} />,
  });
};
