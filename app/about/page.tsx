import Footer from "@/components/footer";
import Header from "@/components/shared/header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Keyversely LLC, a trusted independent third-party reseller of authentic Microsoft software licenses and operating systems based in Wyoming, USA.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Keyversely | KEYVERSELY LLC",
    description:
      "Learn about KEYVERSELY LLC, a Microsoft Partner and trusted provider of digital software licenses.",
    url: "https://getkeyversely.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <Header />
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Title */}
        <div className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            About Keyversely
          </h1>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Providing genuine digital software licenses with secure delivery,
            transparent service, and dedicated customer support.
          </p>
        </div>

        {/* About */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Who We Are
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Keyversely is operated by <strong>KEYVERSELY LLC</strong>, a legally
            registered business based in Wyoming, USA, focused on delivering
            genuine software licenses to customers worldwide.
          </p>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            Our goal is simple: make trusted software accessible, affordable,
            and easy to obtain for individuals, students, professionals, and
            businesses.
          </p>
        </section>

        {/* What We Do */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            What We Do
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Microsoft Windows Licenses",
              "Microsoft Office Licenses",
              "Windows Server Licenses",
              "Business & Productivity Software",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <p className="font-medium text-zinc-900 dark:text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 leading-7 text-zinc-600 dark:text-zinc-400">
            Whether you&apos;re upgrading a personal computer, equipping a
            workspace, or deploying software across an organization, we aim to
            provide reliable solutions backed by professional support.
          </p>
        </section>

        {/* Why Choose */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            Why Choose Keyversely?
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Genuine Software",
                text: "All software licenses sold by KEYVERSELY LLC are sourced through authorized and legitimate distribution channels and delivered digitally to customers after purchase.",
              },
              {
                title: "Fast Delivery",
                text: "Digital license details delivered electronically after purchase.",
              },
              {
                title: "Competitive Pricing",
                text: "Affordable software solutions without compromising quality.",
              },
              {
                title: "Dedicated Support",
                text: "Professional assistance whenever you need help with activation or installation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Our Vision
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            We believe genuine software should be accessible to everyone—not
            just large organizations. Our mission is to help customers obtain
            reliable digital tools that support productivity, security, and
            growth.
          </p>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            We are committed to building a trusted platform where customers can
            purchase software with confidence and peace of mind.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Microsoft Partnership
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            KEYVERSELY LLC is a Microsoft Partner providing software licensing
            solutions to customers worldwide.
          </p>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            Microsoft Partner ID: <strong>7033319</strong>
          </p>

          <a
            href="https://marketplace.microsoft.com/en-us/marketplace/partner-dir/f2266aa5-5704-4384-ad55-100cf2c530cb/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            View Microsoft Partner Profile
          </a>
        </section>

        {/* Company Information */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            Company Information
          </h2>

          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid md:grid-cols-2">
              <div className="border-b p-4 dark:border-zinc-800 md:border-b-0 md:border-r">
                <p className="text-sm text-zinc-500">Legal Company Name</p>
                <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                  KEYVERSELY LLC
                </p>
              </div>

              <div className="p-4">
                <p className="text-sm text-zinc-500">Contact Email</p>
                <a
                  href="mailto:support@keyversely.com"
                  className="mt-1 block font-medium text-blue-600 dark:text-blue-400"
                >
                  support@keyversely.com
                </a>
              </div>
            </div>

            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-sm text-zinc-500">Registered Office Address</p>
              <p className="mt-1 text-zinc-900 dark:text-white">
                63 N Burritt Ave, Rm 100 PMB 1180,
                <br />
                Buffalo, WY 82834,
                <br />
                United States
              </p>
            </div>
          </div>
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-500">Website</p>
            <p className="mt-1 text-zinc-900 dark:text-white">
              https://getkeyversely.com
            </p>
          </div>
        </section>

        {/* Legal Trademark Disclaimer */}
        <div className="mt-8 text-xs text-zinc-500 dark:text-zinc-400 leading-normal border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <p>
            <strong>Legal Notice & Trademark Disclaimer:</strong> Windows,
            Office, and Microsoft are registered trademarks of Microsoft
            Corporation. KEYVERSELY LLC operates as an independent third-party
            reseller of software product keys and is not affiliated with,
            authorized by, sponsored by, or endorsed by Microsoft Corporation.
            All trademarks, service marks, and company names are the property of
            their respective owners.
          </p>
        </div>

        {/* Footer Message */}
        <div className="mt-8 rounded-lg bg-zinc-50 p-6 text-center dark:bg-zinc-800/50">
          <p className="text-zinc-600 dark:text-zinc-400">
            Thank you for choosing Keyversely.
          </p>

          <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
            We appreciate your trust and support.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
