import Footer from "@/components/footer";
import Header from "@/components/shared/header";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping and Digital Delivery Policy",
  description:
    "Find information on our free, 24/7 global electronic fulfillment methods. Learn about our 3-hour maximum security verification window and email deliverability checks.",
  alternates: {
    canonical: "/shipping",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Shipping & Digital Delivery Policy | Instant Email Delivery",
    description:
      "Discover how Keyversely executes zero-freight software product key deliveries immediately via email systems globally.",
    url: "https://getkeyversely.com/shipping",
  },
};

export default function ShippingPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Header />
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header Block */}
        <div className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Shipping & Digital Delivery Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: June 8, 2026
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-7">
            Thank you for choosing Keyversely. This Shipping & Digital Delivery
            Policy applies to all digital products, software activation keys,
            and licenses sold through our marketplace. Because our inventory
            consists exclusively of intangible electronic goods, standard
            physical freight shipping does not apply. Please read this framework
            carefully prior to completing your purchase.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            1. Digital Delivery Method
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            All products are delivered electronically.{" "}
            <strong>
              There will be absolutely no physical items, packages, discs, or
              USB flash drives shipped to your residential or business address.
            </strong>{" "}
            Upon successful verification and payment processing, your unique
            software license activation string will be dispatched directly via
            email.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            2. Fulfillment Timeline & Verification
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            While the vast majority of digital purchases are processed and
            dispatched instantly, delivery may occasionally take up to a{" "}
            <strong>
              typically delivered within minutes, although some orders may
              require up to 3 hours for payment verification and security
              review.
            </strong>
            . This minor extension can occur due to periods of high transaction
            volume, localized payment verification holds, or automatic security
            evaluations conducted by our merchant infrastructure.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            3. Worldwide Availability
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            We provide digital delivery of our authentic software licenses to
            customers worldwide, operating 24 hours a day, 7 days a week, 365
            days a year. There are no customs, import duties, or international
            delivery fees associated with any transaction on our marketplace.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            4. Order Confirmations & Invoices
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            The instant your transaction completes, an automated order
            confirmation email containing your receipt details will be
            generated. This file serves as your official proof of purchase for
            tax and corporate bookkeeping records. We highly recommend saving a
            digital copy of this confirmation notice.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            5. Mitigating Technical Delivery Issues
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            If your software key does not appear in your inbox within the
            specified timeframe, please thoroughly evaluate your email
            client&apos;s <strong>Spam, Junk, or Promotions folders</strong>.
            Security filters occasionally misroute automated transaction
            strings.
          </p>
          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 text-sm">
            <strong>Typo Responsibility Notice:</strong> KEYVERSELY LLC is not
            legally or operationally responsible for delivery delays, missed
            delivery milestones, or lost software strings resulting from
            typographical errors or incorrect email addresses input by the
            customer during checkout.
          </div>
        </section>

        {/* Section 6 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            6. Order Discrepancies and Refund Context
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Due to the immediate visibility and utility of cryptographic
            software keys, Refund eligibility is determined according to our
            Refund Policy and applicable consumer protection laws. If you
            experience activation or installation issues, our support team will
            work with you to resolve the problem. If you run into technical
            implementation blocks or installation anomalies, please connect with
            our engineers. We will actively diagnose, resolve, or handle issues
            to maintain functional operation. For full details on criteria,
            please review our comprehensive **Refund Policy**.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            7. Fraud Screenings & High-Risk Security Holds
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            To guard our platform and credit networks from illicit card
            activity, certain transactions undergo manual security screenings.
            We reserve the right to briefly hold data delivery to request
            supplementary verification info if high-risk parameters are met. We
            appreciate your patience while we verify card security.
          </p>
        </section>

        {/* Section 8 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            8. Policy Adjustments
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            KEYVERSELY LLC explicitly reserves the right to modify, change, or
            update our electronic logistics system and this policy framework at
            any moment without prior warnings. Your continuous acquisition of
            digital products following structural edits serves as a full
            endorsement of our updated operating procedures.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Microsoft Partnership
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            KEYVERSELY LLC is a Microsoft Partner providing software licensing
            solutions to customers worldwide.
          </p>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Microsoft Partner ID: <strong>7033319</strong>
          </p>

          <Link
            href="https://marketplace.microsoft.com/en-us/marketplace/partner-dir/f2266aa5-5704-4384-ad55-100cf2c530cb/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            View Microsoft Partner Profile
          </Link>
        </section>

        {/* Corporate Legal Footer */}
        <section className="mt-8 space-y-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            9. Delivery Support Information
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-lg p-5 text-sm space-y-2 text-zinc-600 dark:text-zinc-400">
            <p>
              <strong>Operating Entity:</strong> KEYVERSELY LLC
            </p>
            <p>
              <strong>Corporate Base Address:</strong> 63 N Burritt Ave, Rm 100
              PMB 1180, Buffalo, WY 82834, USA
            </p>
            <p>
              <strong>Fulfillment Support Link:</strong>{" "}
              <a
                href="mailto:support@keyversely.com"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                support@keyversely.com
              </a>
            </p>
            <p>
              <strong>Website:</strong> https://getkeyversely.com
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
