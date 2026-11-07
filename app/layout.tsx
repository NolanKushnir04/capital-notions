import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

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
  title: {
    default: "Capital Notions",
    template: "%s · Capital Notions",
  },
  description:
    "Independent equity research and market commentary focused on value-driven investment analysis.",
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
