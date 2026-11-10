/** Number formatting shared by the report summary box and the track record. */

/** $22.00 */
export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/** Signed percent change from `base` to `target`, e.g. "+238%" or "−38%". */
export const pctFrom = (target: number, base?: number) => {
  if (!base) return undefined;
  const pct = (target / base - 1) * 100;
  return `${pct >= 0 ? "+" : "−"}${Math.abs(pct).toFixed(0)}%`;
};
