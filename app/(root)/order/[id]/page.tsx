import { getOrderById } from "@/lib/actions/order.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import { ShippingAddress } from "@/types";
import { auth } from "@/auth";
import Stripe from "stripe";
import { getCurrency, getSettlementCurrency } from "@/lib/currency/server";
import { convertAmount } from "@/lib/currency/exchange-rates";
import { BASE_CURRENCY, type CurrencyCode } from "@/lib/i18n/currencies";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const session = await auth();

  let client_secret = null;
  let stripeAmount: number | undefined;
  let stripeCurrency: CurrencyCode | undefined;

  // Check if is not paid and using stripe
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    // The user's display currency is only used when the provider supports it;
    // otherwise checkout settles in the base currency. The amount is converted
    // server-side from the stored (base-currency) total — never from the client.
    const selected = await getCurrency();
    const settlement = getSettlementCurrency(selected);
    const amountInSettlement = await convertAmount(
      Number(order.totalPrice),
      BASE_CURRENCY,
      settlement,
    );

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amountInSettlement * 100),
      currency: settlement,
      metadata: { orderId: order.id },
    });
    client_secret = paymentIntent.client_secret;
    stripeAmount = amountInSettlement;
    stripeCurrency = settlement;
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
      stripeClientSecret={client_secret}
      stripeAmount={stripeAmount}
      stripeCurrency={stripeCurrency}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};
export default OrderDetailsPage;
