import IconBoxes from "@/components/icon-boxes";
import LogoMarquee from "@/components/LogoMarquee";
import HowItWorks from "@/components/shared/product/how-it-works";
import PriceExplanation from "@/components/shared/product/price-explanation";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ReviewsSection from "@/components/shared/reviews-section";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import { Metadata } from "next";
import { getLocale, getT } from "@/lib/i18n/server";
import { localizeProducts } from "@/lib/i18n/product";

export const metadata: Metadata = {
  other: {
    "trustpilot-one-time-domain-verification-id":
      "94fd0b58-dde6-4062-9ce4-49bd34905a0a",
  },
};

const Homepage = async () => {
  const t = await getT();
  const locale = await getLocale();
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  const latestLocalized = localizeProducts(latestProducts, locale);
  const featuredLocalized = localizeProducts(featuredProducts, locale);

  return (
    <div>
      {featuredLocalized.length > 0 && (
        <ProductCarousel data={featuredLocalized} />
      )}

      <ProductList
        data={latestLocalized}
        title={t("home.newestArrivals")}
        limit={4}
      />
      <ViewAllProductsButton />

      <HowItWorks />

      <PriceExplanation />

      <LogoMarquee />

      <ReviewsSection />

      {/* Deal of the week */}

      {/* <DealCountdown /> */}
      <IconBoxes />
    </div>
  );
};

export default Homepage;
