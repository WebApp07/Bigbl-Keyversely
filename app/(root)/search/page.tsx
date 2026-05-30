import ProductCard from "@/components/shared/product/product-card";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import Link from "next/link";

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    pg,
  }: {
    c?: string;
    s?: string;
    pg?: string;
  }) => {
    const params = { q, category, sort, page };

    if (c) params.category = c;
    if (s) params.sort = s;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Categories Links */}
        <div className="text-xl mb-2 mt-3">Categories</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${(category === "all" || category === "") && "font-bold"}`}
                href={getFilterUrl({ c: "all" })}
              >
                All Categories
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
            <div className="">No products found</div>
          )}

          {products.data.map((product) => (
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
