import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import PaymentMethodForm from "./payment-method-form";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { cookies } from "next/headers";
import { getMyCart } from "@/lib/actions/cart.actions";

export const metadata = {
  title: "Payment Method",
  description: "Manage your payment methods and preferences.",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const isGuestCheckout =
    (await cookies()).get("isGuestCheckout")?.value === "true";

  if (!userId && !isGuestCheckout) {
    throw new Error("Unauthorized");
  }

  let preferredPaymentMethod: string | null = null;

  if (userId) {
    const user = await getUserById(userId);
    preferredPaymentMethod = user?.paymentMethod || null;
  } else {
    const cart = await getMyCart();
    preferredPaymentMethod = cart?.paymentMethod || null;
  }

  return (
    <>
      <CheckoutSteps current={2} />
      <PaymentMethodForm preferredPaymentMethod={preferredPaymentMethod} />
    </>
  );
};
export default PaymentMethodPage;
