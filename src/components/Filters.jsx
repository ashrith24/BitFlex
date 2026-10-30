/** Category filter buttons shared by All Tools and category pages. */
export default function Filters({ items, selected, onSelect }) {
  const categories = ["All", ...items.filter((item) => item !== "All")];

  return (
    <div className="filters" role="group" aria-label="Filter tools by category">
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          aria-pressed={selected === category}
          className={selected === category ? "active" : ""}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
