import Link from "next/link";
import { getAllCategories } from "@/lib/actions/product.actions";

export default async function CategoryNav() {
  const categories = await getAllCategories();
  console.log(categories);

  return (
    <nav className="hidden lg:flex items-center justify-center gap-10 py-4 font-semibold uppercase">
      <Link
        href="/"
        className="relative group transition-colors hover:text-primary"
      >
        Home
        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
      </Link>

      {categories.map((category) => (
        <Link
          key={category.category}
          href={`/search?category=${encodeURIComponent(category.category)}`}
          className="relative group transition-colors hover:text-primary"
        >
          {category.category}

          {/* animated underline */}
          <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>
  );
}
