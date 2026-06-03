import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/shared/product/product-price";
import ProductImages from "@/components/shared/product/product-images";
import AddToCart from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.actions";
import ReviewList from "@/app/(root)/product/[slug]/review-list";
import { auth } from "@/auth";
import Rating from "@/components/shared/product/rating";
import { CheckCircle, Star, HelpCircle } from "lucide-react";
import FaqAccordion from "@/components/shared/product/faq-accordion";
import { trustBadgesProducts } from "@/lib/constants";
const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;

  const cart = await getMyCart();

  const renderFeatures = () => {
    if (!product.features) return null;
    const featuresList = product.features
      .split("\n")
      .filter((f: string) => f.trim());

    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {featuresList.map((feature: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-2 p-2 rounded-lg bg-muted/50"
            >
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFaqs = () => {
    if (!product.faqs) return null;
    const faqsList = product.faqs.split("\n").filter((f: string) => f.trim());

    return (
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-500" />
          Frequently Asked Questions
        </h3>
        <FaqAccordion faqs={faqsList} />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <span className="hover:text-foreground cursor-pointer">Home</span>
        {" / "}
        <span className="hover:text-foreground cursor-pointer">Products</span>
        {" / "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border bg-card">
            <ProductImages images={product.images} />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {trustBadgesProducts.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
              >
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
                <span className="text-xs">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          {/* Category & Brand */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Rating value={Number(product.rating)} />
            </div>
            <span className="text-sm text-muted-foreground">
              {product.numReviews} verified reviews
            </span>
          </div>

          {/* Price Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-baseline gap-3">
                <div className="text-4xl font-bold text-primary">
                  <ProductPrice value={Number(product.price)} />
                </div>
                <div className="text-sm text-muted-foreground line-through">
                  {Number(product.price) > 0 && (
                    <ProductPrice value={Number(product.price) * 1.5} />
                  )}
                </div>
                <Badge className="bg-green-500 hover:bg-green-600">
                  Save 33%
                </Badge>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Status:</p>
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        In Stock
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold text-red-500">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Free Delivery</p>
                  <p className="font-semibold">5 minutes in Your Inbox</p>
                </div>
              </div>

              {product.stock > 0 && (
                <div className="mt-4">
                  <AddToCart
                    cart={cart}
                    item={{
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      qty: 1,
                      image: product.images![0],
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h3 className="text-xl font-bold mb-3">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {renderFeatures()}
          {renderFaqs()}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Badge variant="outline" className="text-sm">
            <Star className="w-3 h-3 mr-1 fill-yellow-500 text-yellow-500" />
            {product.numReviews} Reviews
          </Badge>
        </div>
        <ReviewList
          userId={userId || ""}
          productId={product.id}
          productSlug={product.slug}
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
