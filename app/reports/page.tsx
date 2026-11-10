import type { Metadata } from "next";
import Link from "next/link";
import { alternatesFor } from "@/app/lib/site";
import EntryList from "@/app/components/EntryList";
import { getAllEntries } from "@/app/lib/content";

export const metadata: Metadata = {
  title: "Research Reports",
  description:
    "Formal equity research from Capital Notions: initiation reports, valuation work and investment theses.",
  alternates: alternatesFor("/reports"),
};

export default function ReportsIndex() {
  const reports = getAllEntries("reports");

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Equity Research</p>
        <h1 className="page-title">Research Reports</h1>
        <p className="page-intro">
          Formal equity research from the Capital Notions team: initiation
          reports, valuation work and full investment theses.
        </p>
        <Link href="/track-record" className="page-header__link">
          See our track record →
        </Link>
      </header>

      {reports.length > 0 ? (
        <EntryList entries={reports} kind="reports" />
      ) : (
        <p className="empty-state">New research is on the way.</p>
      )}
    </main>
  );
}
