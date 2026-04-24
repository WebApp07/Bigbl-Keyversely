import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

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
  if (!userId) {
    redirect("/signin");
  }

  const user = await getUserById(userId);

  return <div>Shipping Address Page</div>;
};

export default ShippingAddressPage;
