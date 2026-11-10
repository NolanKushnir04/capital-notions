/** Short summary bullets from the `takeaways` frontmatter list. */
export default function KeyTakeaways({ items }: { items?: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <aside className="takeaways" aria-labelledby="takeaways-heading">
      <h2 id="takeaways-heading" className="takeaways__title">
        Key takeaways
      </h2>
      <ul className="takeaways__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}
