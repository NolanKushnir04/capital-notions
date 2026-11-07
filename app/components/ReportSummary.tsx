import type { EntryMeta } from "@/app/lib/content";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const pctFrom = (target: number, base?: number) => {
  if (!base) return undefined;
  const pct = (target / base - 1) * 100;
  return `${pct >= 0 ? "+" : "−"}${Math.abs(pct).toFixed(0)}%`;
};

type Item = {
  label: string;
  value: React.ReactNode;
  sub?: string;
  subBelow?: boolean; // put the sub-text on its own line (long values)
};

/**
 * Key report facts. Each item only shows if its field is in the report's
 * frontmatter; the whole box is skipped if none are.
 *
 * Supported frontmatter: ticker, exchange, rating, priceTarget,
 * priceAtPublication, bullCase, bearCase, sector, industry.
 *
 * `compact` (home page) shows only the headline items.
 */
export default function ReportSummary({
  entry,
  compact = false,
}: {
  entry: EntryMeta;
  compact?: boolean;
}) {
  const {
    ticker,
    exchange,
    rating,
    priceTarget,
    priceAtPublication: ref,
    bullCase,
    bearCase,
    sector,
    industry,
  } = entry;

  // Row 1: the headline call
  const headline: Item[] = [];
  if (ticker) headline.push({ label: "Ticker", value: ticker, sub: exchange });
  if (rating)
    headline.push({
      label: "Rating",
      value: <span className={`rating rating--${rating.toLowerCase()}`}>{rating}</span>,
    });
  if (priceTarget !== undefined)
    headline.push({ label: "Price target", value: money(priceTarget) });
  if (priceTarget !== undefined && ref)
    headline.push({ label: "Implied upside", value: pctFrom(priceTarget, ref) });

  // Row 2: context
  const context: Item[] = [];
  if (ref !== undefined) context.push({ label: "Reference price", value: money(ref) });
  if (bullCase !== undefined)
    context.push({ label: "Bull case", value: money(bullCase), sub: pctFrom(bullCase, ref) });
  if (bearCase !== undefined)
    context.push({ label: "Bear case", value: money(bearCase), sub: pctFrom(bearCase, ref) });
  if (sector)
    context.push({ label: "Sector", value: sector, sub: industry, subBelow: true });

  const items = compact ? headline : [...headline, ...context];
  if (items.length === 0) return null;

  return (
    <dl className={`report-summary${compact ? " report-summary--compact" : ""}`}>
      {items.map((item) => (
        <div key={item.label} className="report-summary__item">
          <dt>{item.label}</dt>
          <dd>
            {item.value}
            {item.sub && (
              <span
                className={`report-summary__sub${item.subBelow ? " report-summary__sub--below" : ""}`}
              >
                {item.sub}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
