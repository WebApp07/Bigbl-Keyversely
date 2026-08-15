import { getT, getMessages } from "@/lib/i18n/server";

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

export default async function AboutPage() {
  const t = await getT();
  const messages = await getMessages();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Title */}
        <div className="mb-10 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {t("about.title")}
          </h1>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            {t("about.subtitle")}
          </p>
        </div>

        {/* About */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {t("about.whoWeAre")}
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            {t("about.whoWeAreP1")}
          </p>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            {t("about.whoWeAreP2")}
          </p>
        </section>

        {/* What We Do */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            {t("about.whatWeDo")}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {messages.about.whatWeDoItems.map((item) => (
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
            {t("about.whatWeDoP")}
          </p>
        </section>

        {/* Why Choose */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            {t("about.whyChoose")}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              messages.about.whyChooseItems.genuine,
              messages.about.whyChooseItems.fastDelivery,
              messages.about.whyChooseItems.competitivePricing,
              messages.about.whyChooseItems.dedicatedSupport,
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
            {t("about.vision")}
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            {t("about.visionP1")}
          </p>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            {t("about.visionP2")}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {t("about.partnership")}
          </h2>

          <p className="leading-7 text-zinc-600 dark:text-zinc-400">
            {t("about.partnershipP1")}
          </p>

          <p className="mt-4 leading-7 text-zinc-600 dark:text-zinc-400">
            {t("about.microsoftPartnerId")}: <strong>7033319</strong>
          </p>

          <a
            href="https://marketplace.microsoft.com/en-us/marketplace/partner-dir/f2266aa5-5704-4384-ad55-100cf2c530cb/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            {t("contact.viewPartnerProfile")}
          </a>
        </section>

        {/* Company Information */}
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-white">
            {t("contact.companyInformation")}
          </h2>

          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="grid md:grid-cols-2">
              <div className="border-b p-4 dark:border-zinc-800 md:border-b-0 md:border-r">
                <p className="text-sm text-zinc-500">{t("about.legalName")}</p>
                <p className="mt-1 font-medium text-zinc-900 dark:text-white">
                  KEYVERSELY LLC
                </p>
              </div>

              <div className="p-4">
                <p className="text-sm text-zinc-500">
                  {t("about.contactEmail")}
                </p>
                <a
                  href="mailto:support@getkeyversely.com"
                  className="mt-1 block font-medium text-blue-600 dark:text-blue-400"
                >
                  support@getkeyversely.com
                </a>
              </div>
            </div>

            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <p className="text-sm text-zinc-500">
                {t("about.registeredAddress")}
              </p>
              <p className="mt-1 text-zinc-900 dark:text-white">
                63 N Burritt Ave, Rm 100 PMB 1180,
                <br />
                Buffalo, WY 82834,
                <br />
                {t("about.unitedStates")}
              </p>
            </div>
          </div>
          <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm text-zinc-500">{t("contact.website")}</p>
            <p className="mt-1 text-zinc-900 dark:text-white">
              https://getkeyversely.com
            </p>
          </div>
        </section>

        {/* Legal Trademark Disclaimer */}
        <div className="mt-8 text-xs text-zinc-500 dark:text-zinc-400 leading-normal border-t border-zinc-100 pt-6 dark:border-zinc-800">
          <p>{t("about.legalNotice")}</p>
        </div>

        {/* Footer Message */}
        <div className="mt-8 rounded-lg bg-zinc-50 p-6 text-center dark:bg-zinc-800/50">
          <p className="text-zinc-600 dark:text-zinc-400">
            {t("about.thankYou")}
          </p>

          <p className="mt-2 font-semibold text-zinc-900 dark:text-white">
            {t("about.trustMessage")}
          </p>
        </div>
      </div>
    </main>
  );
}
