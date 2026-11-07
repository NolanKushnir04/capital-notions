import Link from "next/link";
import { formatDate, type ContentKind, type EntryMeta } from "@/app/lib/content";

/** A ruled list of reports or blog posts: date | title, description, reading time. */
export default function EntryList({
  entries,
  kind,
}: {
  entries: EntryMeta[];
  kind: ContentKind;
}) {
  return (
    <ol className="entry-list">
      {entries.map((entry) => (
        <li key={entry.slug}>
          <Link href={`/${kind}/${entry.slug}`} className="entry">
            <time
              className="entry__date"
              dateTime={entry.date?.toISOString().slice(0, 10)}
            >
              {formatDate(entry.date, "short")}
            </time>

            <div className="entry__body">
              <h2 className="entry__title">
                {entry.title}
                <span className="entry__arrow" aria-hidden="true">→</span>
              </h2>
              {entry.description && (
                <p className="entry__desc">{entry.description}</p>
              )}
              <p className="entry__meta">{entry.readingTime} min read</p>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
