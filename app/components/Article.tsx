import Link from "next/link";
import ReadingProgress from "./ReadingProgress";
import ReportSummary from "./ReportSummary";
import {
  formatDate,
  getAllEntries,
  type ContentKind,
  type Entry,
} from "@/app/lib/content";

const LABELS: Record<ContentKind, { eyebrow: string; back: string }> = {
  reports: { eyebrow: "Equity Research", back: "All reports" },
  blog: { eyebrow: "Blog", back: "All posts" },
};

/** Shared layout for a single report or blog post. */
export default function Article({ entry, kind }: { entry: Entry; kind: ContentKind }) {
  const labels = LABELS[kind];

  // Neighbours for "Newer / Older" links (list is sorted newest first).
  const all = getAllEntries(kind);
  const index = all.findIndex((e) => e.slug === entry.slug);
  const newer = index > 0 ? all[index - 1] : null;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <main className="page">
      <ReadingProgress />

      <article className="article">
        <Link href={`/${kind}`} className="back-link">
          ← {labels.back}
        </Link>

        <header className="article-header">
          <p className="eyebrow">{labels.eyebrow}</p>
          <h1 className="article-title">{entry.title}</h1>
          {entry.description && <p className="article-dek">{entry.description}</p>}
          <p className="article-meta">
            {entry.date && (
              <time dateTime={entry.date.toISOString().slice(0, 10)}>
                {formatDate(entry.date)}
              </time>
            )}
            {entry.date && <span aria-hidden="true">·</span>}
            <span>{entry.readingTime} min read</span>
          </p>
        </header>

        {kind === "reports" && <ReportSummary entry={entry} />}

        <div className="prose" dangerouslySetInnerHTML={{ __html: entry.html }} />

        <footer className="article-footer">
          <div className="article-cta">
            <div>
              <p className="article-cta__title">Get new research by email</p>
              <p className="article-cta__text">
                Be notified when Capital Notions publishes a new report. No spam,
                unsubscribe anytime.
              </p>
            </div>
            <Link href="/subscribe" className="button">
              Subscribe
            </Link>
          </div>

          {(newer || older) && (
            <nav className="article-pager" aria-label="More articles">
              {newer ? (
                <Link href={`/${kind}/${newer.slug}`} className="article-pager__link">
                  <span className="article-pager__label">← Newer</span>
                  <span className="article-pager__title">{newer.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {older && (
                <Link
                  href={`/${kind}/${older.slug}`}
                  className="article-pager__link article-pager__link--older"
                >
                  <span className="article-pager__label">Older →</span>
                  <span className="article-pager__title">{older.title}</span>
                </Link>
              )}
            </nav>
          )}
        </footer>
      </article>
    </main>
  );
}
