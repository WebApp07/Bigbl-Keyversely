import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-2">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <ShoppingCart className="mr-1 h-4 w-4" /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle" aria-label="Open menu">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start gap-3">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Site navigation
            </SheetDescription>
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart className="mr-1 h-4 w-4" /> Cart
              </Link>
            </Button>
            <UserButton />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Menu;
