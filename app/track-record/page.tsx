import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllEntries } from "@/app/lib/content";
import { money, pctFrom } from "@/app/lib/format";
import { getQuote } from "@/app/lib/prices";
import { alternatesFor } from "@/app/lib/site";

// Rebuild at most hourly. Must stay a literal number (Next reads it at build time)
// and should match the price cache in lib/prices.ts; see the note there.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Track Record",
  description:
    "Every Capital Notions research call, tracked from its reference price: rating, price target and return since publication.",
  alternates: alternatesFor("/track-record"),
};

export default async function TrackRecordPage() {
  // Every report with enough data to track.
  const calls = getAllEntries("reports").filter(
    (r) => r.ticker && r.priceAtPublication !== undefined
  );

  const rows = await Promise.all(
    calls.map(async (call) => ({ call, quote: await getQuote(call.ticker!) }))
  );

  const quoteDates = rows.flatMap((r) => (r.quote ? [r.quote.asOf] : []));
  const asOf = quoteDates.length
    ? new Date(Math.max(...quoteDates.map((d) => d.getTime())))
    : null;
  const pricesMissing = rows.some((r) => !r.quote);

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Performance</p>
        <h1 className="page-title">Track Record</h1>
        <p className="page-intro">
          Every call we publish is tracked here from its reference price, the
          share price on the day the report was released, so you can judge our
          research on results.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="empty-state">Tracked calls will appear here.</p>
      ) : (
        <>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th scope="col">Report</th>
                  <th scope="col">Ticker</th>
                  <th scope="col">Rating</th>
                  <th scope="col" className="num">Reference price</th>
                  <th scope="col" className="num">Price target</th>
                  <th scope="col" className="num">Current price</th>
                  <th scope="col" className="num">Return since publication</th>
                  <th scope="col" className="num">Upside to target</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ call, quote }) => {
                  const ref = call.priceAtPublication!;
                  return (
                    <tr key={call.slug}>
                      <td>
                        <Link href={`/reports/${call.slug}`} className="data-table__report">
                          {call.title}
                        </Link>
                        <span className="data-table__date">{formatDate(call.date, "short")}</span>
                      </td>
                      <td className="data-table__ticker">
                        {call.ticker}
                        {call.exchange && (
                          <span className="data-table__exchange">{call.exchange}</span>
                        )}
                      </td>
                      <td>
                        {call.rating ? (
                          <span className={`rating rating--${call.rating.toLowerCase()}`}>
                            {call.rating}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="num">{money(ref)}</td>
                      <td className="num">
                        {call.priceTarget !== undefined ? money(call.priceTarget) : "—"}
                      </td>
                      <td className="num">{quote ? money(quote.price) : "—"}</td>
                      <td className="num data-table__strong">
                        {quote ? pctFrom(quote.price, ref) : "—"}
                      </td>
                      <td className="num">
                        {quote && call.priceTarget !== undefined
                          ? pctFrom(call.priceTarget, quote.price)
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="table-note">
            {asOf ? (
              <>
                Prices as of {formatDate(asOf)} · Source: Finnhub, refreshed hourly.
                {pricesMissing && " Some live prices are currently unavailable."}
              </>
            ) : (
              <>Live prices are currently unavailable.</>
            )}{" "}
            Returns are price-only and exclude dividends. Past performance does
            not guarantee future results, and nothing here is investment advice.
          </p>
        </>
      )}
    </main>
  );
}
