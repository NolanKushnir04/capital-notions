import type { Metadata } from "next";
import { alternatesFor } from "@/app/lib/site";
import Image from "next/image";
import Link from "next/link";
import EntryList from "@/app/components/EntryList";
import ReportSummary from "@/app/components/ReportSummary";
import SubscribeInline from "@/app/components/SubscribeInline";
import { formatDate, getAllEntries } from "@/app/lib/content";

export const metadata: Metadata = {
  alternates: alternatesFor("/"),
};

const PRINCIPLES = [
  {
    title: "Deep equity research",
    text: "Full initiation reports built from filings, earnings calls and our own models, not headlines.",
  },
  {
    title: "Disciplined valuation",
    text: "Every rating is backed by an explicit model and price target, with the assumptions shown.",
  },
  {
    title: "Honest about risk",
    text: "We lay out downside scenarios and disclose our positions, so you can weigh the call yourself.",
  },
];

export default function Home() {
  const reports = getAllEntries("reports");
  const [latest, ...more] = reports;

  return (
    <main className="page home">
      {/* Hero */}
      <section className="home-hero">
        <Image
          src="/cn-mark.png"
          alt="Capital Notions logo"
          width={88}
          height={88}
          priority
          className="home-hero__logo"
        />
        <p className="eyebrow">Independent Equity Research</p>
        <h1 className="home-hero__title">Capital Notions</h1>
        <p className="home-hero__lead">
          Value-driven investment analysis and market commentary. Our work
          emphasizes deep equity research, disciplined valuation and thoughtful
          discussion of risk and opportunity.
        </p>
        <div className="home-hero__actions">
          {latest && (
            <Link href={`/reports/${latest.slug}`} className="button">
              Read the latest report
            </Link>
          )}
          <Link href="/reports" className="button button--ghost">
            Browse research
          </Link>
        </div>
      </section>

      {/* Latest report */}
      {latest && (
        <section className="home-section" aria-labelledby="latest-heading">
          <div className="section-head">
            <h2 id="latest-heading" className="section-head__title">
              Latest Report
            </h2>
            <Link href="/reports" className="section-head__link">
              All reports →
            </Link>
          </div>

          <Link href={`/reports/${latest.slug}`} className="feature">
            <div className="feature__body">
              <p className="feature__meta">
                {formatDate(latest.date)} · {latest.readingTime} min read
              </p>
              <h3 className="feature__title">{latest.title}</h3>
              {latest.description && (
                <p className="feature__desc">{latest.description}</p>
              )}
              <span className="feature__cta">
                Read the report <span aria-hidden="true">→</span>
              </span>
            </div>
            <div className="feature__facts">
              <ReportSummary entry={latest} compact />
            </div>
          </Link>
        </section>
      )}

      {/* Older reports (appears once there's more than one) */}
      {more.length > 0 && (
        <section className="home-section" aria-labelledby="more-heading">
          <div className="section-head">
            <h2 id="more-heading" className="section-head__title">
              More Research
            </h2>
          </div>
          <EntryList entries={more.slice(0, 4)} kind="reports" />
        </section>
      )}

      {/* Approach */}
      <section className="home-section" aria-labelledby="approach-heading">
        <div className="section-head">
          <h2 id="approach-heading" className="section-head__title">
            Our Approach
          </h2>
          <Link href="/about" className="section-head__link">
            About us →
          </Link>
        </div>
        <div className="principles">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="principle">
              <h3 className="principle__title">{p.title}</h3>
              <p className="principle__text">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="home-subscribe" aria-labelledby="subscribe-heading">
        <div>
          <h2 id="subscribe-heading" className="home-subscribe__title">
            Get new research by email
          </h2>
          <p className="home-subscribe__text">
            Be the first to read each new report. No spam, unsubscribe anytime.
          </p>
        </div>
        <SubscribeInline />
      </section>
    </main>
  );
}
