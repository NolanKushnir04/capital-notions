import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, alternatesFor } from "./lib/site";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_CA",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary" },
  // Default: just the RSS link. Each page sets its own canonical via alternatesFor().
  alternates: { types: alternatesFor("/").types },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="site-body">
        <SiteHeader />
        <div className="site-main">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
