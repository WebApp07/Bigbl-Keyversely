import Header from "@/components/shared/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import FAQ from "@/components/faq";
import FeedbackForm from "@/components/feedback-form";
import type { Metadata } from "next";
import { quickContactOptions } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Keyversely support. Fast and reliable help.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-8 lg:px-6 space-y-16">
      <Header />

      {/* Hero Section */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 p-10 md:p-16 border border-zinc-200 dark:border-zinc-800">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-medium text-dark  mb-6">
            <i className="ti ti-headset text-lg mr-2" aria-hidden="true" />
            Support Center
          </h1>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4">
            We&apos;re here to help
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Having issues with your order, license activation, or anything else?
            Our team usually responds within 30 minutes during business hours.
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-10">
            {quickContactOptions.map(({ label }) => (
              <div
                key={label}
                className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-16">
          <ContactForm />
          <FAQ />
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-8 space-y-8">
            <FeedbackForm />

            <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8">
              <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-6">
                Other ways to reach us
              </h3>

              <div className="space-y-6">
                <a
                  href="mailto:support@keyversely.com"
                  className="group flex items-center gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-3 -mx-3 rounded-xl transition-colors"
                >
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <i className="ti ti-mail text-2xl" />
                  </div>
                  <div>
                    <div className="text-zinc-900 dark:text-white font-medium">
                      Email Us
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      support@keyversely.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 -mx-3 rounded-xl text-zinc-600 dark:text-zinc-400">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <i className="ti ti-clock text-2xl" />
                  </div>
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">
                      Business Hours
                    </div>
                    <div className="text-sm">Mon–Fri, 9:00 – 18:00 UTC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
