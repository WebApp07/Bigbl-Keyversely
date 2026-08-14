"use client";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/client";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const { t } = useI18n();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (res?.success) {
        toast.success(t("product.addedToCart"), {
          description: res.message,
          duration: 4000,
          action: {
            label: t("header.viewCart"),
            onClick: () => router.push("/cart"),
          },
        });
        router.refresh();
      } else {
        toast.error(t("product.couldNotAdd"), {
          description: t("product.pleaseTryAgain"),
          duration: 5000,
        });
      }
    });
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast.success(t("product.removedFromCart"), {
        description: res.message,
        duration: 4000,
      });
      return;
    });
  };

  // Check if item in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}{" "}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}{" "}
      {t("product.addToCart")}
    </Button>
  );
};

export default AddToCart;