import { getAllCategories } from "@/lib/actions/product.actions";
import {
  APP_COMPANY_ADDRESS,
  APP_EMAIL_SUPPORT,
  APP_NAME_FOOTER,
  APP_PHONE_NUMBER,
  paymentMethodsIcons,
} from "@/lib/constants";
import { getT } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const t = await getT();
  const categories = await getAllCategories();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{APP_NAME_FOOTER}</h3>
            <p className="text-sm text-muted-foreground">
              {APP_COMPANY_ADDRESS}
            </p>

            <div className="text-sm space-y-1 text-muted-foreground">
              <p>
                {t("footer.email")}: {APP_EMAIL_SUPPORT}
              </p>
              <p>
                {t("footer.phone")}: {APP_PHONE_NUMBER}
              </p>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.information")}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.aboutUs")}
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.termsConditions")}
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.refundPolicy")}
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.shippingPolicy")}
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.customerCare")}</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/contact-us"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.contactUs")}
              </Link>
              <Link
                href="/faq"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.faqs")}
              </Link>
              <Link
                href="/track-order"
                className="hover:text-foreground transition-colors"
              >
                {t("footer.trackOrder")}
              </Link>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-semibold mb-4">
              {t("footer.popularCategories")}
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              {categories.map((c) => (
                <Link
                  key={c.category}
                  href={`/search?category=${c.category}`}
                  className="hover:text-foreground transition-colors"
                >
                  {c.category}
                </Link>
              ))}
            </div>
          </div>

          {/* Secure Payments */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.securePayments")}</h4>

            <div className="flex flex-wrap gap-4">
              {paymentMethodsIcons.map((method) => (
                <div key={method.name} className="flex items-center gap-2">
                  <Image
                    src={method.image}
                    alt={`${method.name} payment method`}
                    width={48}
                    height={32}
                    className="h-8 w-auto opacity-75 hover:opacity-100 transition-opacity"
                    title={method.name}
                  />
                </div>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {t("footer.secureCheckoutNote")}
            </div>
          </div>

          {/* Microsoft Partner */}
          <div className="border-t pt-4">
            <Link
              href="https://marketplace.microsoft.com/en-us/marketplace/partner-dir/f2266aa5-5704-4384-ad55-100cf2c530cb/overview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-start gap-2 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/partners/microsoft-partner.png"
                alt="KEYVERSELY LLC Microsoft Partner"
                width={150}
                height={50}
                className="h-auto w-auto"
              />

              <p className="text-sm text-muted-foreground">
                Microsoft Partner ID: 7033319
              </p>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME_FOOTER}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;