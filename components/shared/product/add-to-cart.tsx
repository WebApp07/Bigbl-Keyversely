"use client";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/actions/cart.actions";
import { CartItem } from "@/types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (res.success) {
      toast.success(`${item.name} added to cart!`, {
        description: "You can continue shopping below.",
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
  console.log(item);
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <PlusIcon /> Add to Cart
    </Button>
  );
};

export default AddToCart;
