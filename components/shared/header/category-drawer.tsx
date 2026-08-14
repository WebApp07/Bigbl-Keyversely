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
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getT } from "@/lib/i18n/server";

const CategoryDrawer = async () => {
  const t = await getT();
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      {/* Trigger */}
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("header.categories")}
          className="hover:scale-105 transition-transform"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full max-w-sm flex flex-col">
        {/* Header */}
        <DrawerHeader className="border-b sticky top-0 bg-background z-10 relative">
          <DrawerTitle className="text-lg font-semibold">
            {t("header.categories")}
          </DrawerTitle>

          <p className="text-sm text-muted-foreground">
            {t("header.browseCategories")}
          </p>

          {/* Close Button */}
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 hover:scale-110 transition-transform"
              aria-label={t("header.closeMenu")}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        {/* Content */}
        <ScrollArea className="flex-1 p-4">
          {categories.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <p>{t("home.noProductsFound")}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* All Products */}
              <DrawerClose asChild>
                <Link
                  href="/search"
                  className="group flex items-center justify-between w-full p-4 rounded-xl border hover:border-primary/40 hover:bg-accent transition-all duration-200 hover:shadow-sm"
                >
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {t("header.allProducts")}
                  </span>

                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {t("common.viewAll")}
                  </span>
                </Link>
              </DrawerClose>

              <Separator className="my-3" />

              {/* Categories */}
              {categories.map((category) => (
                <DrawerClose key={category.category} asChild>
                  <Link
                    href={`/search?category=${encodeURIComponent(
                      category.category,
                    )}`}
                    className="group flex items-center justify-between w-full p-4 rounded-xl border hover:border-primary/40 hover:bg-accent transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
                  >
                    <span className="font-medium capitalize group-hover:text-primary transition-colors">
                      {category.category}
                    </span>

                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
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