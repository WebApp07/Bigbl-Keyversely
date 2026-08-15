import { Product } from "@/types";
import { BASE_CURRENCY } from "@/lib/i18n/currencies";

export default function ProductSchema(product: Product) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",

    name: product.name,

    image: product.images,

    description: product.description,

    sku: product.id,

    category: product.category,

    brand: {
      "@type": "Brand",
      name: product.brand,
    },

    offers: {
      "@type": "Offer",

      url: `https://getkeyversely.com/product/${product.slug}`,

      priceCurrency: BASE_CURRENCY,

      price: product.price,

      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      itemCondition: "https://schema.org/NewCondition",
    },

    aggregateRating:
      product.numReviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.numReviews,
          }
        : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
