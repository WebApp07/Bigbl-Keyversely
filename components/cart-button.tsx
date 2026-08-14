import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCartCount } from "@/lib/actions/cart.actions";
import { getT } from "@/lib/i18n/server";

export default async function CartButton() {
  const t = await getT();
  const count = await getCartCount();

  return (
    <Button asChild variant="ghost" className="relative">
      <Link href="/cart">
        <ShoppingCart className="mr-1 h-4 w-4" />
        {t("header.cart")}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}