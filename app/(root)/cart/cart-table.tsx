import { Cart } from "@/types";
import Link from "next/link";

const CartTable = ({ cart }: { cart?: Cart }) => {
  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Your cart is empty. <Link href="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-col-4 md:gap-5">
          <div className="overflow-x-auto">Table</div>
        </div>
      )}
    </>
  );
};

export default CartTable;
