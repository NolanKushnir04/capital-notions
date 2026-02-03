import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const REPORTS_PATH = path.join(process.cwd(), "content/reports");

function getLatestReport() {
  const files = fs.readdirSync(REPORTS_PATH);

  const reports = files.map((file) => {
    const fullPath = path.join(REPORTS_PATH, file);
    const stats = fs.statSync(fullPath);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);

    return {
      slug: file.replace(".md", ""),
      title: data.title ?? file.replace(".md", ""),
      description: data.description ?? "",
      modified: stats.mtime,
    };
  });

  reports.sort((a, b) => b.modified.getTime() - a.modified.getTime());

  return reports[0];
}

export default function Home() {
  const latestReport = getLatestReport();
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "-50px auto",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      {/* Header */}
<header style={{ marginBottom: "100px" }}>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr auto 1fr",
      alignItems: "center",
      marginBottom: "0px",
    }}
  >
    {/* Left: Logo */}
    <div style={{ justifySelf: "start", marginLeft: "70px" }}>
      <img
        src="/logo.png"
        alt="Capital Notions logo"
        style={{ width: "216px" }} // logo size
      />
    </div>

    {/* Center: Title */}
<h1
  style={{
    fontFamily: "Roboto, system-ui, sans-serif",
    fontSize: "3.1rem",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    margin: 0,
  }}
>
  Capital Notions
</h1>

    {/* Right: empty spacer to keep title centered */}
    <div />
  </div>

  {/* Subtitle */}
  <p
    style={{
      fontFamily: "Roboto, system-ui, sans-serif",
    fontSize: "1.15rem",
    lineHeight: 1.7,
    maxWidth: "725px",
    marginTop: "-18px",     // brings it UP
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "0",
    textAlign: "center",
  }}
  >
    Capital Notions is an independent research platform 
    focused on value-driven investment analysis and 
    market commentary. Our work emphasizes deep equity research, 
    disciplined valuation, and thoughtful discussion of news,
    risk, and opportunity. 
  </p>
</header>

      {/* Latest post preview */}
      <section>
        <h2
          style={{
            fontFamily: "Roboto, system-ui, sans-serif",
            fontSize: "2.1rem",
            marginBottom: "24px",
            marginTop: "80px",
            fontWeight: 500,
          }}
        >
          ↓ Latest Research Report ↓ 
        </h2>

        <a
          href={`/reports/${latestReport.slug}`}
          style={{
            fontFamily: "Roboto, system-ui, sans-serif",
            display: "block",
            maxWidth: "640px",
            margin: "32px auto",
            padding: "32px",
            border: "1px solid #000000",
            borderRadius: "14px",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <h3
            style={{
              fontFamily: "Roboto, system-ui, sans-serif",
              fontSize: "1.5rem",
              marginTop: "-12px",
              marginBottom: "18px",
              letterSpacing: "-0.01em",
            }}
          >
            {latestReport.title}
          </h3>

          <p
            style={{
              fontFamily: "Roboto, system-ui, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.6,
              marginBottom: "18px",
            }}
          >
            {latestReport.description}
          </p>

          <span
            style={{
              fontFamily: "Roboto, system-ui, sans-serif",
              fontSize: "0.95rem",
              fontWeight: 500,
              marginTop: "8px",
              marginBottom: "-12px",
              display: "block",
            }}
          >
            Read report →
          </span>
        </a>
      </section>
    </main>
  );
}
