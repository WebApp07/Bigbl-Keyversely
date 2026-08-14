import Link from "next/link";
import { Button } from "./ui/button";
import { getT } from "@/lib/i18n/server";

const ViewAllProductsButton = async () => {
  const t = await getT();
  return (
    <div className="flex justify-center items-center my-8">
      <Button asChild className="px-8 py-4 text-lg font-semibold">
        <Link href="/search">{t("common.viewAll")}</Link>
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
