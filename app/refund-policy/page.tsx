import Footer from "@/components/footer";
import Header from "@/components/shared/header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Returns Policy | KEYVERSELY LLC",
  description:
    "Understand our digital asset return guidelines. Review the criteria for defective software key claims, 30-day technical replacement windows, and final sale exceptions.",
  alternates: {
    canonical: "/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Refund & Returns Policy | Keyversely Digital Software",
    description:
      "Review our absolute technical guidelines regarding software key performance validations, dispute workflows, and duplicate order cancellation checks.",
    url: "https://getkeyversely.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Header />
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header Block */}
        <div className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Refund and Returns Policy
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: June 8, 2026
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-7">
            Keyversely provides digital software licenses delivered instantly
            via email. Because our products are digital intangible goods that
            are revealed immediately upon transmission, they fall under specific
            international digital commerce regulations. By making a purchase on
            our marketplace, you acknowledge and agree to the terms outlined
            below.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            1. Nature of Digital Products
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            All products sold on our website are digital software license keys
            delivered electronically via email.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            2. Refund Eligibility & Defective Keys
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Due to the easily replicable nature of software product keys,
            refunds, store credits, or product replacements are strictly
            limited. They are granted exclusively under the following two
            conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li>
              <strong>Invalid or Non-Working Key:</strong> If the license key
              fails to activate your software and our technical backend audit
              confirms that the specific license code is defective or exhausted.
            </li>
            <li>
              <strong>Incorrect Product Variant Delivered:</strong> If an
              automated system error occurs and you receive a completely
              different operating system edition or software license than what
              you purchased.
            </li>
          </ul>
          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 text-sm">
            <strong>Important Digital Goods Exception:</strong> In accordance
            with US commercial practices and international digital copyright
            standards, refund eligibility may be limited once a license key has
            been delivered. Refund requests are evaluated according to this
            policy and applicable consumer protection laws.
          </div>
        </section>

        {/* Section 3 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            3. Reporting an Issue & Verification Timeline
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            If you encounter a technical failure during license entry, you must
            open a support ticket within <strong>30 days</strong> of your
            original checkout date. To report an issue, email us at:{" "}
            <a
              href="mailto:support@getkeyversely.com"
              className="text-blue-600 dark:text-blue-400 underline font-medium"
            >
              support@getkeyversely.com
            </a>
          </p>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm font-medium">
            Your claim submission must contain the following verification
            elements:
          </p>
          <ul className="list-decimal pl-5 space-y-1 text-zinc-600 dark:text-zinc-400 text-sm">
            <li>Your official Order Number (e.g., #KEY-XXXX)</li>
            <li>The full name of the software product purchased</li>
            <li>
              An unedited, full-screen desktop screenshot showing the explicit
              activation error message or error code returned by the system
            </li>
            <li>
              A brief summary of your machine operating system environment
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            4. Resolution & Activation Support
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Upon receiving your technical claim, our support team will
            cross-reference the activation logs with the distribution ledger. We
            will first provide step-by-step guidance to ensure the key is being
            entered into the matching software build. If the key is verified as
            defective from the distributor, we will issue a replacement license
            code or a replacement license key, store credit, or refund when
            appropriate under this policy.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            5. Non-Refundable Situations
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Refund requests generally cannot be approved in the following
            circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
            <li>
              Purchasing the wrong system edition (e.g., buying Windows Home
              instead of Windows Pro by mistake).
            </li>
            <li>
              System incompatibility or local hardware failures that prevent
              your device from running the software.
            </li>
            <li>
              Failure to read the product descriptions, regional locks, or
              system requirements stated on our store pages prior to ordering.
            </li>
            <li>
              License codes that have already been activated successfully on
              your device.
            </li>
            <li>
              Accidental duplicates caused by submitting multiple checkout
              requests due to local internet latency or page refreshes.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            6. Fraud Prevention & Abuse Monitoring
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            To guard against software key harvesting and credit card fraud,
            KEYVERSELY LLC actively monitors checkout data. We reserve the right
            to reject refund claims, restrict domain profiles, or block future
            purchases if we detect pattern matching indicative of unauthorized
            license key redistribution, chargeback abuse, or systemic returns.
          </p>
        </section>

        {/* Section 7 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            7. Refund Processing Channels
          </h2>
          <p className="leading-7 text-zinc-600 dark:text-zinc-400 text-sm">
            Once an engineering evaluation is completed and a refund is
            approved, credit instructions are dispatched to our payment
            processor within 24 business hours. Funds will be issued back
            exclusively to your original payment method (e.g., the specific
            Visa, Mastercard, or electronic wallet configuration used during
            checkout). Depending on your banking institution, settlement
            timeline ranges typically span 5 to 10 processing days.
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

          <a
            href="https://marketplace.microsoft.com/en-us/marketplace/partner-dir/f2266aa5-5704-4384-ad55-100cf2c530cb/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:underline dark:text-blue-400"
          >
            View Microsoft Partner Profile
          </a>
        </section>

        {/* Section 8 / Contact */}
        <section className="mt-8 space-y-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            8. Corporate Contact Information
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 rounded-lg p-5 text-sm space-y-2 text-zinc-600 dark:text-zinc-400">
            <p>
              <strong>Legal Entity Name:</strong> KEYVERSELY LLC
            </p>
            <p>
              <strong>Registered Address:</strong> 63 N Burritt Ave, Rm 100 PMB
              1180, Buffalo, WY 82834, USA
            </p>
            <p>
              <strong>Support and Returns Email:</strong>{" "}
              <a
                href="mailto:support@getkeyversely.com"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                support@getkeyversely.com
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
