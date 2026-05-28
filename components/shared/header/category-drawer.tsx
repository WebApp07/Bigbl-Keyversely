import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Categories">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm flex flex-col">
        {/* Header */}
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-lg font-semibold">
            Categories
          </DrawerTitle>
        </DrawerHeader>

        {/* Categories List */}
        <ScrollArea className="flex-1 p-4">
          {categories.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No categories available</p>
            </div>
          ) : (
            <div className="space-y-1">
              {/* All Products Link */}
              <DrawerClose asChild>
                <Link
                  href="/search"
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="font-medium">All Products</span>
                </Link>
              </DrawerClose>

              <Separator className="my-2" />

              {/* Category Links */}
              {categories.map((category) => (
                <DrawerClose key={category.category} asChild>
                  <Link
                    href={`/search?category=${category.category}`}
                    className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span className="font-medium capitalize">
                      {category.category}
                    </span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {category._count}
                    </span>
                  </Link>
                </DrawerClose>
              ))}
            </div>
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
