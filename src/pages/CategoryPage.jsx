import { useState } from "react";
import CategoryArt from "../components/CategoryArt.jsx";
import Filters from "../components/Filters.jsx";
import ToolCard from "../components/ToolCard.jsx";
import { allTools, toolGroups } from "../data/tools.js";

/** A category page reuses the same banner, filters, and cards for every group. */
export default function CategoryPage({ groupKey }) {
  const group = toolGroups[groupKey];
  const [filter, setFilter] = useState("All");
  const categoryTools = allTools
    .filter((tool) => tool.group === groupKey)
    .filter((tool) => filter === "All" || tool.subcategory === filter);
  const filters = [...new Set(group.tools.map((tool) => tool[2]))];

  const description =
    groupKey === "image"
      ? "Edit, convert, compress and enhance your images."
      : `Powerful tools to work with your ${group.category.toLowerCase()} files.`;

  return (
    <main className="wrap listing">
      <section className={`category-banner ${group.tone}`}>
        <div>
          <span className="eyebrow">FILECONVERT TOOLKIT</span>
          <h1>{group.label}</h1>
          <p>{description}</p>
        </div>
        <CategoryArt group={groupKey} />
      </section>

      <Filters items={filters} selected={filter} onSelect={setFilter} />

      <div className="tool-grid">
        {categoryTools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <section className="request-card">
        <div>
          <b>Can’t find what you need?</b>
          <p>Request a tool and we’ll build it for you.</p>
        </div>
        <a
          className="button button-primary"
          href="mailto:hello@fileconvert.example?subject=Tool%20request"
        >
          Request Tool
        </a>
      </section>
    </main>
  );
}
