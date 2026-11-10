/**
 * Live stock quotes from Finnhub (https://finnhub.io), cached for a day.
 *
 * Needs FINNHUB_API_KEY in .env.local (and in Vercel's environment variables).
 * Without a key, or if anything goes wrong, getQuote returns null and pages
 * show "—" instead of breaking. The free plan covers US listings only.
 */
export type Quote = { price: number; asOf: Date };

const ONE_DAY = 60 * 60 * 24;

export async function getQuote(ticker: string): Promise<Quote | null> {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}`,
      {
        headers: { "X-Finnhub-Token": key },
        next: { revalidate: ONE_DAY },
      }
    );
    if (!res.ok) return null;

    // c = current price, t = timestamp (seconds). Unknown symbols return c = 0.
    const data = (await res.json()) as { c?: number; t?: number };
    if (!data.c || !data.t) return null;

    return { price: data.c, asOf: new Date(data.t * 1000) };
  } catch {
    return null;
  }
}
