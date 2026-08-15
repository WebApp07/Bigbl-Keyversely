import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

import "@/assets/styles/globals.css";

import { auth } from "@/auth";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";
import OrganizationSchema from "@/components/OrganizationSchema";
import MetaPixel from "@/components/MetaPixel";
import { I18nProvider } from "@/lib/i18n/client";
import { getLocale } from "@/lib/i18n/server";
import { CurrencyProvider } from "@/lib/currency/client";
import { getCurrency, getRatesForClient } from "@/lib/currency/server";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: `%s | Keyversely`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),

  // The site serves content per-language via geo/manual detection on the same
  // URLs, so every supported language points at the canonical route and
  // x-default signals the auto-detected variant to search engines.
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      en: "/",
      fr: "/",
      es: "/",
      de: "/",
    },
  },

  verification: {
    google: "JX08Bjof5Y3ogo9HzrS0uDzm1e0gW8qrQjo1qr6lGAs",
    other: {
      "trustpilot-one-time-domain-verification-id":
        "94fd0b58-dde6-4062-9ce4-49bd34905a0a",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const initialLocale = await getLocale();
  const initialCurrency = await getCurrency();
  const rates = await getRatesForClient();

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <MetaPixel />

        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <CurrencyProvider
              initialCurrency={initialCurrency}
              rates={rates}
            >
              <I18nProvider initialLocale={initialLocale}>
                {children}

                <OrganizationSchema />

                <Toaster />
              </I18nProvider>
            </CurrencyProvider>
          </ThemeProvider>
        </SessionProvider>

        {/* Google Analytics 4 */}
        <GoogleAnalytics gaId="G-G9TXV72QY1" />

        {/* Google Ads */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18332685984"
          strategy="afterInteractive"
        />

        <Script id="google-ads-config" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];

function gtag() {
    window.dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", "AW-18332685984");
`}
        </Script>
      </body>
    </html>
  );
}
