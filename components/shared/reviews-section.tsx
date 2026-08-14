import { getLatestReviews } from "@/lib/actions/review.action";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/components/shared/product/rating";
import { User, Quote } from "lucide-react";
import Link from "next/link";
import { getT } from "@/lib/i18n/server";

const ReviewsSection = async () => {
  const t = await getT();
  const reviews = await getLatestReviews({ limit: 6 });

  if (reviews.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-border" />
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {t("home.customerReviews")}
          </span>
          <span className="h-px w-10 bg-border" />
        </div>

        <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
          {t("home.reviewsTitle")}
        </h2>

        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {t("home.reviewsDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="group border-border bg-card transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <Rating value={review.rating} />
                <Quote className="w-8 h-8 text-blue-100 dark:text-blue-900/30" />
              </div>

              <h3 className="font-semibold text-sm mb-2 line-clamp-1 italic">
                {review.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-4">
                {review.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-medium">
                    {review.user ? review.user.name : t("home.verifiedCustomer")}
                  </span>
                </div>
                {review.product && (
                  <Link
                    href={`/product/${review.product.slug}`}
                    className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline line-clamp-1 max-w-[120px]"
                  >
                    {review.product.name}
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
