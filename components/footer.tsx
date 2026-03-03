import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40" aria-label="Site footer">
      <div className="container mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Keyversely LLC</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Keyversely LLC is a registered software distribution company. We
              sell genuine Microsoft and Adobe software licenses with secure
              payment processing and instant digital delivery worldwide.
            </p>
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://facebook.com/keyversely"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Keyversely LLC on Facebook"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/keyversely"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Keyversely LLC on Instagram"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Partner Badges */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/images/partners/microsoft-partner.png"
              alt="Microsoft Certified Partner – Keyversely LLC"
              width={150}
              height={50}
              className="transition hover:scale-105"
            />
            <Image
              src="/images/partners/adobepartner.png"
              alt="Adobe Certified Reseller – Keyversely LLC"
              width={150}
              height={50}
              className="transition hover:scale-105"
            />
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Company</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" title="About Keyversely LLC">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" title="Contact Keyversely LLC">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    title="Keyversely Privacy Policy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" title="Terms and Conditions">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-policy"
                    title="Software License Refund Policy"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact & Trust */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:support@keyversely.com"
                  className="hover:text-foreground transition"
                >
                  support@keyversely.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+11234567890"
                  className="hover:text-foreground transition"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li>
                123 Business Ave, Suite 100
                <br />
                New York, NY 10001, USA
              </li>
            </ul>

            <h3 className="font-semibold text-lg mt-5 mb-3">
              Trust &amp; Security
            </h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>✔ Registered LLC Company</li>
              <li>✔ Microsoft &amp; Adobe Reseller</li>
              <li>✔ Secure Payment Processing</li>
              <li>✔ Instant Digital Delivery</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Keyversely LLC. All rights reserved.</p>
          <p className="mt-1 text-xs">
            Genuine Microsoft &amp; Adobe software licenses — secure, fast,
            trusted.
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Keyversely LLC",
            url: "https://bigbl.com",
            logo: "https://bigbl.com/images/logo.png",
            description:
              "Keyversely LLC is a registered company specializing in digital software distribution. We sell genuine Microsoft and Adobe software licenses with secure payments and instant delivery.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "123 Business Ave, Suite 100",
              addressLocality: "New York",
              addressRegion: "NY",
              postalCode: "10001",
              addressCountry: "US",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+1-123-456-7890",
              contactType: "customer support",
              email: "support@keyversely.com",
              url: "https://bigbl.com/contact",
            },
            sameAs: [
              "https://facebook.com/keyversely",
              "https://instagram.com/keyversely",
            ],
          }),
        }}
      />
    </footer>
  );
};

export default Footer;
