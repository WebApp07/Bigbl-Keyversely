import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/actions/product.actions";
import { SearchIcon } from "lucide-react";
import { getT } from "@/lib/i18n/server";

const Search = async () => {
  const t = await getT();
  const categories = await getAllCategories();
  return (
    <form action="/search" method="GET" className="w-full">
      <div className="flex w-full items-stretch overflow-hidden rounded-full border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring">
        <Select name="category">
          <SelectTrigger className="h-12 w-auto min-w-[110px] border-0 rounded-none bg-transparent px-4 shadow-none focus:ring-0 data-[placeholder]:text-muted-foreground">
            <SelectValue placeholder={t("common.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="All" value="all">
              {t("common.all")}
            </SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          name="q"
          type="text"
          placeholder={t("common.searchPlaceholder")}
          className="h-12 w-full flex-1 rounded-none border-0 shadow-none bg-transparent focus-visible:ring-0"
        />

        <Button
          type="submit"
          size="icon"
          className="h-12 w-14 shrink-0 rounded-none"
          aria-label={t("common.search")}
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default Search;