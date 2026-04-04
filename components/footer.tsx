import Link from "next/link";

const LINKS = [
  { href: "/about-us", label: "About Us" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/help-center", label: "Help Center" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/shipping-delivery", label: "Shipping & Delivery" },
  { href: "/contact-us", label: "Contact Us" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 flex-center flex-wrap space-x-4">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:underline text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="p-5 flex-center text-xs text-gray-500">
        Keyversely LLC © {currentYear} bigbl.com. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
