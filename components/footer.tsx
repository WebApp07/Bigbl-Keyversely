import { APP_COMPANY_ADDRESS, APP_EMAIL_SUPPORT, APP_NAME, APP_PHONE_NUMBER } from "@/lib/constants";
import Link from "next/link";

const Footer = async () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{APP_NAME}</h3>

            <p className="text-sm text-muted-foreground">
              {
                APP_COMPANY_ADDRESS
              }
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
              <Link href="/about">About Us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/refund-policy">Refund Policy</Link>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-4">Customer Care</h4>

            <div className="flex flex-col gap-2 text-sm">
              <Link href="/contact">Contact Us</Link>
              <Link href="/faq">FAQs</Link>
              <Link href="/track-order">Track Order</Link>
              <Link href="/shipping-policy">Shipping Policy</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Popular Products</h4>

            <div className="flex flex-col gap-2 text-sm">
              <Link href="/search?category=Windows">Windows Keys</Link>
              <Link href="/search?category=Office">Microsoft Office</Link>
              <Link href="/search?category=Adobe">Adobe Products</Link>
              <Link href="/search?category=Antivirus">Antivirus</Link>
            </div>
          </div>

          {/* Trust */}
          <div className="space-y-4">
            <h4 className="font-semibold">Secure Payments</h4>

            <div className="flex flex-wrap gap-2">
              <div className="rounded-md border px-3 py-2 text-xs">Visa</div>
              <div className="rounded-md border px-3 py-2 text-xs">
                Mastercard
              </div>
              <div className="rounded-md border px-3 py-2 text-xs">PayPal</div>
            </div>

            <div className="text-sm text-muted-foreground">
              Secure checkout with industry-standard encryption.
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KeyVersely. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
