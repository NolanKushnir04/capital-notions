import type { MetadataRoute } from "next";
import { getAllEntries } from "@/app/lib/content";
import { absoluteUrl } from "@/app/lib/site";

/** /sitemap.xml: every page, so search engines can find all reports and posts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const reports = getAllEntries("reports");
  const posts = getAllEntries("blog");
  const latest = [...reports, ...posts][0]?.date ?? undefined;

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: reports[0]?.date ?? latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/reports"), lastModified: reports[0]?.date ?? undefined, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/track-record"), changeFrequency: "daily", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: posts[0]?.date ?? undefined, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/subscribe"), changeFrequency: "yearly", priority: 0.4 },
  ];

  const entries: MetadataRoute.Sitemap = [
    ...reports.map((e) => ({
      url: absoluteUrl(`/reports/${e.slug}`),
      lastModified: e.date ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((e) => ({
      url: absoluteUrl(`/blog/${e.slug}`),
      lastModified: e.date ?? undefined,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return [...pages, ...entries];
}
