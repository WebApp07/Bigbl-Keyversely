import TrackOrderClient from "./track-order-client";

export const metadata = {
  title: "Track Your Order",
  description: "Enter your order ID and email to check your order status.",
};

export default function TrackOrderPage() {
  return <TrackOrderClient />;
}
