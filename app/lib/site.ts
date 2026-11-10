/** Site-wide constants used for SEO (sitemap, RSS, canonical URLs, structured data). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://capitalnotions.ca").replace(
  /\/$/,
  ""
);

export const SITE_NAME = "Capital Notions";

export const SITE_DESCRIPTION =
  "Independent equity research and market commentary focused on value-driven investment analysis.";

/** Absolute URL for a site path, e.g. absoluteUrl("/reports") */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Page `alternates` metadata: the canonical URL plus the RSS feed link.
 * (Next.js replaces the whole `alternates` object per page rather than
 * merging it, so every page sets both through this helper.)
 */
export const alternatesFor = (path: string) => ({
  canonical: path,
  types: { "application/rss+xml": [{ url: "/feed.xml", title: `${SITE_NAME} RSS` }] },
});
