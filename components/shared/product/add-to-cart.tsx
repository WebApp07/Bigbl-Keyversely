"use client";

import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Loader, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (res?.success) {
        toast.success("Added to cart", {
          description: res.message,
          duration: 4000,
          action: {
            label: "View Cart",
            onClick: () => router.push("/cart"),
          },
        });
        router.refresh();
      } else {
        toast.error("Couldn't add to cart", {
          description: "Please try again.",
          duration: 5000,
        });
      }
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast.success("Removed from cart", {
        description: res.message,
        duration: 4000,
      });
    });
  };

  const existItem = cart?.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div className="flex items-center">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleRemoveFromCart}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>

      <span className="px-4 font-medium">{existItem.qty}</span>

      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleAddToCart}
        disabled={isPending}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      onClick={handleAddToCart}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin mr-2" />
      ) : (
        <Plus className="h-4 w-4 mr-2" />
      )}
      Add to Cart
    </Button>
  );
};

export default AddToCart;
