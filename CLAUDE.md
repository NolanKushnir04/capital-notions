# Capital Notions

Independent equity research site (reports + blog). Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (theme + utilities only), markdown content via gray-matter + remark. Deployed on Vercel from `main`. Newsletter signups go to Supabase via a server action.

## Commands
- `npm run dev` runs the site at http://localhost:3000 (the owner reviews changes here)
- `npm run build` is the production build; run it before any commit/push
- `npx tsc --noEmit` and `npx eslint .` must both be clean (currently zero warnings)

## Working with the owner
- Explain what you did and why in plain terms.
- For multi-part work, go in **chunks** and **stop after each one** so they can review on localhost.
- Never commit or push unless asked. Pushing to `main` deploys live.
- The owner decides on copy (mission text, bios, "Our Approach"). Flag any wording you write.
- Reports are the main focus. **Do not feature blog posts on the home page.**

## Design direction
Modern minimal financial press: Berkshire Hathaway esque with WSJ/FT polish. Serif headings, sans body, generous white space, hairline rules, one navy accent, subtle hover states. **Avoid** gradients, heavy cards, bright colors, big animations, emoji and icon clutter.

### Tokens (`:root` in `app/globals.css`)
| Token | Value | Use |
|---|---|---|
| `--ink` | `#111111` | headings, primary text |
| `--ink-soft` | `#2b2b2b` | article body |
| `--muted` | `#5f6368` | secondary text, dates, meta |
| `--rule` | `#e6e6e3` | hairline borders |
| `--bg` / `--bg-subtle` | `#fff` / `#f7f7f5` | page / tinted boxes (footer, summary, CTA) |
| `--accent` / `--accent-soft` | `#1b3a7a` / `#e9eef8` | navy from the CN logo: links, active states, focus ring |
| `--content-width` / `--reading-width` | `1080px` / `700px` | page container / text column |

- Rating colors: buy `#1a7f37`, hold `#9a6700`, sell `#b42318`. Use them only for ratings and form messages.
- Fonts (loaded in `app/layout.tsx` via `next/font`): **Source Serif 4** for h1–h4 (`var(--font-serif)`) and **Inter** for body (`var(--font-sans)`).
- Breakpoints: `680px` is the main mobile switch. `820/860/960px` are used for grid collapses.
- Small uppercase labels: 0.7–0.8rem, weight 600, letter-spacing 0.08–0.1em (`.eyebrow` in accent, `.section-head__title` in ink).
- Always keep `:focus-visible` outlines. Text selection stays enabled. `scrollbar-gutter: stable` keeps short and long pages aligned.

### Styling conventions
- **No inline styles.** Use the semantic BEM-ish classes in `globals.css` (`.block__element--modifier`), grouped by section comments (Header, Footer, Page scaffolding, Entry list, Article, Home, About, Subscribe, 404). Add new styles to the matching section.
- Tailwind's preflight reset is **not** loaded. The small base reset in `globals.css` is used instead. Tailwind utilities and `@theme` colors (`text-muted`, `border-rule`, `bg-subtle`, `text-accent`, `font-serif`) are available for one-offs.
- Reuse existing building blocks before adding new ones:
  - `.page` (container) → `.page-header` > `.eyebrow` + `.page-title` + `.page-intro`
  - `.section-head` (uppercase title + right-hand link + dark rule)
  - `.button`, `.button--ghost`
  - `.principle` (title + muted text, used in 3-column rows)
  - `.home-subscribe` (tinted CTA box)
  - `.form-message--success|error`
- Every page's `<main>` gets `className="page"`. The root layout wraps pages in a `div.site-main` (not `<main>`).

## Code map
- `app/layout.tsx`: fonts, metadata title template (`%s · Capital Notions`), `SiteHeader` / `SiteFooter`
- `app/components/`
  - `SiteHeader`: sticky; active link from `usePathname`; "Menu" toggle under 680px
  - `SiteFooter`: links, contact, **investment disclaimer** (keep it)
  - `EntryList`: ruled list of reports/posts
  - `Article`: shared report/blog page with progress bar, summary box, prose, CTA, newer/older links
  - `ReportSummary`: key-facts box; `compact` prop shows the headline row only (home page)
  - `SubscribeInline`: one-line email form (home)
  - `ReadingProgress`
- `app/lib/content.ts`: **all markdown reading goes through here** (`getAllEntries`, `getEntry`, `formatDate`). Don't read `content/` directly in pages.
- `app/actions/subscribe.ts`: Supabase insert into `Subscribers`
- Pages: `/`, `/reports`, `/reports/[slug]`, `/blog`, `/blog/[slug]`, `/about` (team is a data array at the top), `/subscribe`, `not-found.tsx`

## Content conventions (`content/reports/*.md`, `content/blog/*.md`)
- Frontmatter: `title`, `description`, `date` (YYYY-MM-DD) are required. The newest by `date` appears first, and the newest report is the one featured on the home page.
- Optional report fields that fill the summary box (each item hides if missing): `ticker`, `exchange`, `rating` (Buy/Hold/Sell), `priceTarget`, `priceAtPublication` (shown as "Reference price"), `bullCase`, `bearCase`, `sector`, `industry`. Upside percentages are computed.
- `normalizeMarkdown` in `content.ts` adapts the owner's writing style. Keep it working:
  - a line that is only `**Bold text:**` becomes an `h2`
  - `## **Appendix:**` becomes a clean `h2`
  - lines starting with `•` become list items
- Exhibit captions are written as `[*Source: Capital Notions, Exhibit #N*](/images/x.jpeg)` and styled as small captions. Links to `/images/...` open in a new tab. Clickable images are `[![alt](src)](src)`.
- Always write descriptive alt text (e.g. `![Exhibit 8: rNPV model deriving a $22 price target](...)`), never "Alt text".
- Dates are formatted in UTC, because frontmatter dates parse as UTC midnight.
- Many `public/images/*.jpeg` files are actually AVIF or WebP. Browsers handle this fine. To view one yourself, convert it with the bundled `sharp` package.

## Gotchas (Windows dev machine)
- **The Turbopack dev server sometimes misses the last of several quick `globals.css` edits** and serves stale CSS, which makes pages look unstyled. After any CSS change, fetch the page's `/_next/static/...css` and grep for a new class. If it's missing, append a newline (`printf '\n' >> app/globals.css`); `touch` does not work. If that also fails, kill the dev server, delete `.next`, and restart.
- Stopping the background `npm run dev` task can leave `node ... start-server.js` listening on port 3000. Find it with `netstat -ano | grep :3000` and kill it by PID.
- In Git Bash, `/tmp` and Node disagree on the path. Use the session scratchpad for temp files that Node reads.
