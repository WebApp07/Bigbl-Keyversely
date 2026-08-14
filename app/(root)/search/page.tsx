import ProductCard from "@/components/shared/product/product-card";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import { getLocale, getT } from "@/lib/i18n/server";
import { localizeProducts } from "@/lib/i18n/product";

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
  }>;
}) {
  const { q = "all", category = "all" } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";

  if (isQuerySet || isCategorySet) {
    return {
      title: `
      Search ${isQuerySet ? q : ""} 
      ${isCategorySet ? `: Category ${category}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}) => {
  const { q = "all", category = "all", page = "1" } = await props.searchParams;
  const t = await getT();
  const locale = await getLocale();

  // Construct filter url
  const getFilterUrl = ({
    c,

    pg,
  }: {
    c?: string;
    pg?: string;
  }) => {
    const params = { q, category, page };

    if (c) params.category = c;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Categories Links */}
        <div className="text-xl mb-2 mt-3">{t("search.categories")}</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${(category === "all" || category === "") && "font-bold"}`}
                href={getFilterUrl({ c: "all" })}
              >
                {t("search.allCategories")}
              </Link>
            </li>

            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && "font-bold"}`}
                  href={getFilterUrl({ c: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="grid grid-col-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && (
            <div className="">{t("search.noProductsFound")}</div>
          )}

          {localizeProducts(products.data, locale).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                features: product.features ?? "",
                faqs: product.faqs ?? "",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;