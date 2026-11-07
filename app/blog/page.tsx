import type { Metadata } from "next";
import EntryList from "@/app/components/EntryList";
import { getAllEntries, type EntryMeta } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Shorter-form commentary from Capital Notions on markets, companies and personal finance.",
};

export default function BlogIndex() {
  const posts = getAllEntries("blog");

  // Group posts by year (already sorted newest first).
  const byYear = new Map<number, EntryMeta[]>();
  for (const post of posts) {
    const year = post.date?.getUTCFullYear() ?? 0;
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(post);
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Commentary</p>
        <h1 className="page-title">Blog</h1>
        <p className="page-intro">
          Shorter-form writing on markets, companies we&apos;re watching and
          personal finance.
        </p>
      </header>

      {[...byYear.entries()].map(([year, yearPosts]) => (
        <section key={year} className="year-group" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="year-group__label">
            {year || "Undated"}
          </h2>
          <EntryList entries={yearPosts} kind="blog" />
        </section>
      ))}
    </main>
  );
}
