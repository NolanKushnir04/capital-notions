import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <div className="not-found">
        <p className="eyebrow">404</p>
        <h1 className="page-title">Page not found</h1>
        <p className="page-intro">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="home-hero__actions not-found__actions">
          <Link href="/" className="button">
            Back to home
          </Link>
          <Link href="/reports" className="button button--ghost">
            Browse research
          </Link>
        </div>
      </div>
    </main>
  );
}
