import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const REPORTS_PATH = path.join(process.cwd(), "content/reports");

export default function ReportsIndex() {
  const files = fs.readdirSync(REPORTS_PATH);

  const reports = files
    .map((file) => {
      const slug = file.replace(".md", "");
      const content = fs.readFileSync(path.join(REPORTS_PATH, file), "utf8");
      const { data } = matter(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? new Date(data.date) : new Date(0),
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <main style={{ maxWidth: 720, margin: "44px auto" }}>
      <h1>Research Reports</h1>

      <ul
        style={{
          marginTop: "28px",
          paddingLeft: "20px",
        }}
      >
        {reports.map((report) => (
          <li
            key={report.slug}
            style={{
              marginBottom: "18px",
              lineHeight: 1.6,
            }}
          >
            <Link
              href={`/reports/${report.slug}`}
              style={{
                fontSize: "1.05rem",
                textDecoration: "none",
              }}
            >
              {report.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
