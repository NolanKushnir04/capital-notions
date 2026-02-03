import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import Link from "next/link";

const REPORTS_PATH = path.join(process.cwd(), "content/reports");

export default async function ReportPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const filePath = path.join(REPORTS_PATH, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

return (
  <main style={{ maxWidth: 720, margin: "80px auto" }}>
    <Link
      href="/reports"
      style={{
        display: "inline-block",
        marginBottom: "24px",
        fontSize: "14px",
        textDecoration: "none",
        color: "#555",
      }}
    >
      ← Back to reports
    </Link>

    <h1>{data.title}</h1>

    <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
  </main>
)}
