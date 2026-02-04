import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Capital Notions",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Roboto font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body
  style={{
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  }}
>
  {/* Top navigation bar */}
  <nav
    style={{
    width: "100%",
    padding: "48px 248px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "48px",
    fontSize: "1rem",
    boxSizing: "border-box",
    }}
  >
    <Link href="/">Home</Link>
    <Link href="/about">About Us</Link>
    <Link href="/reports">Reports</Link>
    <Link href="/blog">Blog</Link>
    <Link href="/subscribe">Subscribe</Link>

  </nav>

  {/* Page content */}
  <main style={{ flex: 1 }}>
    {children}
  </main>

  {/* Footer (anchored bottom) */}
  <footer
    style={{
      marginTop: "auto",
      padding: "20px 0",
      textAlign: "center",
      fontFamily: "Roboto, system-ui, sans-serif",
      fontSize: "0.9rem",
      color: "#555",
    }}
  >
    <a
      href="mailto:nolansnotions@gmail.com"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      nolansnotions@gmail.com
    </a>

    <span style={{ margin: "0 12px", opacity: 0.6 }}>•</span>

    <a
      href="tel:+16479669851"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      +1 (647) 966-9851
    </a>
  </footer>
</body>
    </html>
  );
}
