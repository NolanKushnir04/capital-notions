import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Shared helpers for reading the markdown files in /content.
 * "reports" -> content/reports/*.md, "blog" -> content/blog/*.md
 */
export type ContentKind = "reports" | "blog";

export type EntryMeta = {
  slug: string;
  title: string;
  description: string;
  date: Date | null;
  readingTime: number; // minutes
  // Optional report fields (used by the report summary box)
  ticker?: string;
  exchange?: string;
  rating?: string;
  priceTarget?: number;
  priceAtPublication?: number;
  bullCase?: number;
  bearCase?: number;
  sector?: string;
  industry?: string;
  // Optional short summary bullets shown above the article body
  takeaways?: string[];
};

export type Entry = EntryMeta & { html: string };

const WORDS_PER_MINUTE = 230;

function dirFor(kind: ContentKind) {
  return path.join(process.cwd(), "content", kind);
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): EntryMeta {
  const words = body.trim().split(/\s+/).length;
  const num = (v: unknown) =>
    v === undefined || v === null || v === "" ? undefined : Number(v);

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: data.date ? new Date(data.date as string) : null,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    ticker: data.ticker as string | undefined,
    exchange: data.exchange as string | undefined,
    rating: data.rating as string | undefined,
    priceTarget: num(data.priceTarget),
    priceAtPublication: num(data.priceAtPublication),
    bullCase: num(data.bullCase),
    bearCase: num(data.bearCase),
    sector: data.sector as string | undefined,
    industry: data.industry as string | undefined,
    takeaways: Array.isArray(data.takeaways)
      ? data.takeaways.filter((t): t is string => typeof t === "string" && t.trim() !== "")
      : undefined,
  };
}

/** All entries of a kind, newest first (by frontmatter `date`). */
export function getAllEntries(kind: ContentKind): EntryMeta[] {
  const dir = dirFor(kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return toMeta(slug, data, content);
    })
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}

/**
 * Light clean-up of our writing conventions before rendering, so the
 * markdown files can stay exactly as they're written:
 *  - A line that is only bold text ("**Executive Summary:**") becomes a heading.
 *  - "## **Appendix:**" becomes "## Appendix".
 *  - Lines starting with "•" become real list items.
 */
function normalizeMarkdown(md: string) {
  return md
    .replace(/^(#{1,6})\s*\*\*(.+?)\*\*\s*:?\s*$/gm, (_, hashes, text) =>
      `${hashes} ${text.replace(/:\s*$/, "")}`
    )
    .replace(/^\*\*([^*\n]+?)\*\*\s*$/gm, (_, text) => `## ${text.replace(/:\s*$/, "")}`)
    .replace(/^•\s*/gm, "- ");
}

/** One entry with its markdown rendered to HTML, or null if it doesn't exist. */
export async function getEntry(kind: ContentKind, slug: string): Promise<Entry | null> {
  const filePath = path.join(dirFor(kind), `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const processed = await remark().use(html).process(normalizeMarkdown(content));

  // Load images lazily so long reports open fast, and open links to
  // images (e.g. exhibits) in a new tab so readers keep their place.
  const rendered = processed
    .toString()
    .replace(/<img /g, '<img loading="lazy" decoding="async" ')
    .replace(/<a href="(\/images\/[^"]+)"/g, '<a href="$1" target="_blank" rel="noopener"');

  return { ...toMeta(slug, data, content), html: rendered };
}

/**
 * Dates in frontmatter (e.g. 2025-12-10) are parsed as midnight UTC, so we
 * format in UTC too. Otherwise Toronto time would show the previous day.
 */
export function formatDate(date: Date | null, style: "long" | "short" = "long") {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
