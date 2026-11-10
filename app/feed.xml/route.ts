import { getAllEntries, type ContentKind } from "@/app/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/app/lib/site";

// Built once per deploy (content only changes when we deploy).
export const dynamic = "force-static";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const CATEGORY: Record<ContentKind, string> = {
  reports: "Equity Research",
  blog: "Commentary",
};

/** /feed.xml: RSS 2.0 feed of reports and blog posts, newest first. */
export function GET() {
  const items = (["reports", "blog"] as const)
    .flatMap((kind) => getAllEntries(kind).map((entry) => ({ ...entry, kind })))
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

  const xmlItems = items
    .map((e) => {
      const url = absoluteUrl(`/${e.kind}/${e.slug}`);
      return [
        "    <item>",
        `      <title>${escapeXml(e.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        e.description ? `      <description>${escapeXml(e.description)}</description>` : "",
        e.date ? `      <pubDate>${e.date.toUTCString()}</pubDate>` : "",
        `      <category>${CATEGORY[e.kind]}</category>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const lastBuild = items[0]?.date?.toUTCString() ?? new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-ca</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
