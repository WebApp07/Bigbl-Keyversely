import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import ProductPrice from "./product-price";
import { Cart, Product } from "@/types";
import Rating from "./rating";
import AddToCart from "./add-to-cart";
import { getT } from "@/lib/i18n/server";

const ProductCard = async ({ product, cart }: { product: Product; cart?: Cart }) => {
  const t = await getT();
  // Create cart item from product
  const cartItem = {
    productId: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    qty: 1,
    image: product.images[0],
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0 items-center">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">{t("common.outOfStock")}</p>
          )}
        </div>
        {/* Add to Cart button - only show if in stock */}
        {product.stock > 0 && <AddToCart cart={cart} item={cartItem} />}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
