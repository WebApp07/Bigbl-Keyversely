import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { EllipsisVertical } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";
import CartButton from "@/components/cart-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-2">
        <ModeToggle />
        <CartButton />
        <UserButton />
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <EllipsisVertical className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col items-start gap-4">
            <SheetTitle>Menu</SheetTitle>

            <SheetDescription className="sr-only">
              Site navigation
            </SheetDescription>

            <ModeToggle />

            <CartButton />

            <UserButton />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Menu;
