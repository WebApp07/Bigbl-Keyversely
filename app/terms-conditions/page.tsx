import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the official user agreement and marketplace rules for Keyversely LLC. Learn about regional constraints, platform usage, and user account liabilities.",
  alternates: {
    canonical: "/terms-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions | Keyversely LLC",
    description:
      "Read the official terms governing software license distribution, regional responsibilities, and system use on the Keyversely platform.",
    url: "https://getkeyversely.com/terms-conditions",
  },
};

export default function TermsConditionsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Header />
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Terms & Conditions
          </h1>

          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Last updated: June 8, 2026
          </p>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            Welcome to Keyversely. These Terms and Conditions govern your use of
            our website and the purchase of digital software products from our
            platform.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            1. Introduction
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            By accessing this website and purchasing products from our store,
            you agree to be bound by these Terms & Conditions.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            2. Use of Website
          </h2>

          <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              You must use this website in accordance with applicable laws.
            </li>
            <li>
              You may not attempt to disrupt or interfere with the operation of
              this website.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            3. Products & Digital Delivery
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              We provide digital software license keys and related products.
              Products are delivered electronically via email after successful
              payment verification. No physical goods are shipped.
            </p>
          </p>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400">
            Customers are responsible for ensuring compatibility and selecting
            the correct product before purchase.
          </div>
        </section>

        {/* Section 4 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            4. Orders & Payments
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            Orders are processed after successful payment authorization. We
            reserve the right to decline or cancel orders suspected of fraud or
            unauthorized activity.
          </p>
        </section>

        {/* Section 5 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            5. Refund Policy
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            Due to the nature of digital products, refunds may be limited once a
            license key has been delivered. Refund eligibility is determined in
            accordance with our Refund Policy and applicable consumer laws.
          </p>
        </section>

        {/* Section 6 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            6. Intellectual Property
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            All content, branding, graphics, and website materials are the
            property of KEYVERSELY LLC unless otherwise stated.
          </p>

          <div className="rounded-lg border border-zinc-200 p-4 text-xs leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <div className="rounded-lg border border-zinc-200 p-4 text-xs leading-6 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              Microsoft, Windows, Office, and related trademarks are the
              property of Microsoft Corporation. KEYVERSELY LLC is an
              independent software reseller and Microsoft Partner. Trademark
              references are used solely for identification, compatibility, and
              informational purposes.
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            7. Limitation of Liability
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            To the maximum extent permitted by law, we shall not be liable for
            indirect, incidental, or consequential damages arising from the use
            of our website or products.
          </p>
        </section>

        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Microsoft Partnership
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            KEYVERSELY LLC is a Microsoft Partner providing software licensing
            solutions to customers worldwide.
          </p>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
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

        {/* Section 8 */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            8. Changes to These Terms
          </h2>

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">
            We may update these Terms & Conditions periodically. Continued use
            of the website following changes constitutes acceptance of the
            revised terms.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mt-8 space-y-3 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Contact Information
          </h2>

          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid md:grid-cols-2">
              <div className="border-b p-4 dark:border-zinc-800 md:border-b-0 md:border-r">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Company
                </p>

                <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                  KEYVERSELY LLC
                </p>
              </div>

              <div className="p-4">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Email
                </p>

                <a
                  href="mailto:support@keyversely.com"
                  className="mt-1 inline-block text-blue-600 hover:underline dark:text-blue-400"
                >
                  support@keyversely.com
                </a>
              </div>
            </div>

            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Registered Address
              </p>

              <p className="mt-1 text-zinc-900 dark:text-white">
                63 N Burritt Ave, Rm 100 PMB 1180
                <br />
                Buffalo, WY 82834
                <br />
                United States
              </p>
            </div>
            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Website
              </p>

              <p className="mt-1 text-zinc-900 dark:text-white">
                https://getkeyversely.com
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
