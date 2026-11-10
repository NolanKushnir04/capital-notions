import type { Metadata } from "next";
import { alternatesFor } from "@/app/lib/site";

// The subscribe page itself is a client component (it uses form state), and
// client components can't export metadata, so it lives here instead.
export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Get new Capital Notions equity research by email. No spam, unsubscribe anytime.",
  alternates: alternatesFor("/subscribe"),
};

export default function SubscribeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
