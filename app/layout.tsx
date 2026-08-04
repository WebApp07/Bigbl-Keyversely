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

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <MetaPixel />

        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <OrganizationSchema />

            <Toaster />
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
