import { getAllCategories } from "@/lib/actions/product.actions";
import {
  APP_COMPANY_ADDRESS,
  APP_EMAIL_SUPPORT,
  APP_NAME,
  APP_PHONE_NUMBER,
  paymentMethodsIcons,
} from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const categories = await getAllCategories();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{APP_NAME}</h3>
            <p className="text-sm text-muted-foreground">
              {APP_COMPANY_ADDRESS}
            </p>

            <div className="text-sm space-y-1 text-muted-foreground">
              <p>Email: {APP_EMAIL_SUPPORT}</p>
              <p>Phone: {APP_PHONE_NUMBER}</p>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:text-foreground transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-foreground transition-colors"
              >
                Refund Policy
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:text-foreground transition-colors"
              >
                Shipping Policy
              </Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/contact-us"
                className="hover:text-foreground transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="hover:text-foreground transition-colors"
              >
                FAQs
              </Link>
              <Link
                href="/track-order"
                className="hover:text-foreground transition-colors"
              >
                Track Order
              </Link>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-semibold mb-4">Popular Categories</h4>
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
            <h4 className="font-semibold">Secure Payments</h4>

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
              Secure checkout with industry-standard encryption.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
