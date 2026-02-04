import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import Link from "next/link";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export default async function BlogPost(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;

  const filePath = path.join(BLOG_PATH, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);

  const formattedDate = data.date
  ? new Date(data.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : null;

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
  <main style={{ maxWidth: 720, margin: "80px auto" }}>
    <Link
      href="/blog"
      style={{
        display: "inline-block",
        marginBottom: "24px",
        fontSize: "14px",
        textDecoration: "none",
        color: "#555",
      }}
    >
      ← Back to blog posts
    </Link>

    <h1>{data.title}</h1>

    {formattedDate && (
  <p
    style={{
      fontSize: "0.9rem",
      color: "#666",
      marginTop: "8px",
      marginBottom: "32px",
    }}
  >
    {formattedDate}
  </p>
)}

    <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
  </main>
)}
