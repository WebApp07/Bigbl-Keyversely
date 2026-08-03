import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address-form";
import { ShippingAddress } from "@/types";
import CheckoutSteps from "@/components/shared/checkout-steps";
import { cookies } from "next/headers";

export const metadata = {
  title: "Shipping Address",
  description: "Enter your shipping address to complete your order.",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const session = await auth();
  const userId = session?.user?.id;

  const isGuestCheckout =
    (await cookies()).get("isGuestCheckout")?.value === "true";

  if (!userId && !isGuestCheckout) {
    redirect("/sign-in");
  }

  let address: ShippingAddress | null = null;

  if (userId) {
    const user = await getUserById(userId);
    address = user?.address as ShippingAddress;
  } else {
    address = cart.shippingAddress as ShippingAddress;
  }

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
