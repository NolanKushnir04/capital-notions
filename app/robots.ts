import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/app/lib/site";

/** /robots.txt: allow all crawlers and point them to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
