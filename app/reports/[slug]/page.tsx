import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Article from "@/app/components/Article";
import { getAllEntries, getEntry } from "@/app/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Pre-build every report page at deploy time.
export function generateStaticParams() {
  return getAllEntries("reports").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntry("reports", slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function ReportPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getEntry("reports", slug);
  if (!entry) notFound();

  return <Article entry={entry} kind="reports" />;
}
