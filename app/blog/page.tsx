import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

const BLOG_PATH = path.join(process.cwd(), "content/blog");

export default function BlogIndex() {
  const files = fs.readdirSync(BLOG_PATH);

  const posts = files
    .map((file) => {
      const slug = file.replace(".md", "");
      const content = fs.readFileSync(path.join(BLOG_PATH, file), "utf8");
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
      <h1>Blog</h1>

      <ul
        style={{
          marginTop: "28px",
          paddingLeft: "20px",
        }}
      >
        {posts.map((post) => (
          <li
            key={post.slug}
            style={{
              marginBottom: "18px",
              lineHeight: 1.6,
            }}
          >
            <Link
              href={`/blog/${post.slug}`}
              style={{
                fontSize: "1.05rem",
                textDecoration: "none",
              }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
