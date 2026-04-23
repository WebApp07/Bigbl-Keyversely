"use client";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { Cart, CartItem } from "@/types";
import { Minus, Plus, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
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
  };

  // Handle remove from cart
  const handleRemoveFromCart = async () => {
    const res = await removeItemFromCart(item.productId);
    toast.success("Removed from cart", {
      description: res.message,
      duration: 4000,
    });
    return;
  };

  // Check if item in cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button">
      <PlusIcon /> Add to Cart
    </Button>
  );
};

export default AddToCart;
