import { APP_EMAIL_SUPPORT, APP_NAME, APP_PHONE_NUMBER } from "@/lib/constants";
import { ShieldCheck, Headset, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
import CategoryNav from "./category-nav";
import { getT } from "@/lib/i18n/server";

const Header = async () => {
  const t = await getT();
  return (
    <header className="w-full border-b bg-background">
      {/* Top announcement bar */}
      <div className="bg-neutral-900 text-white dark:bg-neutral-950">
        <div className="wrapper flex-between !py-2 text-xs">
          <div className="flex items-center gap-5">
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-green-400" />
              {t("header.genuineKeys")}
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Headset className="h-3.5 w-3.5 text-blue-400" />
              {t("header.support247")}
            </span>
            <span className="font-semibold uppercase tracking-wider text-amber-300">
              {t("header.instantDelivery")}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`mailto:${APP_EMAIL_SUPPORT}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {APP_EMAIL_SUPPORT}
            </a>
            <a
              href={`tel:${APP_PHONE_NUMBER.replace(/[^+\d]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              {APP_PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>

      {/* Main header row */}
      <div className="wrapper !py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <div className="flex-start">
            <CategoryDrawer />
            <Link href="/" className="flex-start ml-4">
              <Image
                src="/images/logo.svg"
                alt={`${APP_NAME} logo`}
                height={48}
                width={48}
                priority={true}
              />
              <span className="hidden sm:block font-bold text-2xl ml-3">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Big search bar - full width on mobile, centered on desktop */}
          <div className="order-3 w-full md:order-none md:mx-auto md:w-auto md:flex-1 md:max-w-2xl">
            <Search />
          </div>

          <Menu />
        </div>
      </div>

      <CategoryNav />
    </header>
  );
};

export default Header;