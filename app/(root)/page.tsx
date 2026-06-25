import IconBoxes from "@/components/icon-boxes";
import LogoMarquee from "@/components/LogoMarquee";
import HowItWorks from "@/components/shared/product/how-it-works";
import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  {
    return (
      <div>
        {featuredProducts.length > 0 && (
          <ProductCarousel data={featuredProducts} />
        )}

        <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
        <ViewAllProductsButton />

        <HowItWorks />

        <LogoMarquee />

        {/* Deal of the week */}

        {/* <DealCountdown /> */}
        <IconBoxes />
      </div>
    );
  }
};

export default Homepage;
