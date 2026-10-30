import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from "../components/CategoryIcon.jsx";
import Filters from "../components/Filters.jsx";
import ToolCard from "../components/ToolCard.jsx";
import { allTools, matchesTool, toolGroups } from "../data/tools.js";

const filterCategories = [
  "Image",
  "PDF",
  "Document",
  "Video",
  "Audio",
  "Other",
];

/** Searchable directory with a preview of each tool category. */
export default function AllTools() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = category === "All" || tool.category === category;
    return matchesCategory && matchesTool(tool, query);
  });

  const isFiltering = query.length > 0 || category !== "All";

  function submitSearch(event) {
    event.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
  }

  return (
    <main className="wrap listing all-tools-page">
      <div className="directory-heading">
        <div className="page-heading">
          <div>
            <span className="eyebrow">YOUR FILE WORKSPACE</span>
            <h1>All Tools</h1>
            <p>
              Find the right tool to convert, edit, compress, and manage your
              files.
            </p>
          </div>
        </div>

        <div
          className="directory-summary"
          aria-label={`${allTools.length} tools across ${Object.keys(toolGroups).length} categories`}
        >
          <span className="summary-icon">
            <SlidersHorizontal aria-hidden="true" />
          </span>
          <div>
            <b>{allTools.length} useful tools</b>
            <small>Across {Object.keys(toolGroups).length} categories</small>
          </div>
        </div>
      </div>

      <form
        className="searchbox directory-search"
        onSubmit={submitSearch}
        role="search"
      >
        <Search aria-hidden="true" />
        <input
          aria-label="Search all tools"
          placeholder="Search tools by name or file type..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <X aria-hidden="true" />
          </button>
        )}
        <button className="search-submit" type="submit">
          Search tools <ArrowRight size={14} aria-hidden="true" />
        </button>
      </form>

      <div className="filter-heading">
        <div>
          <b>Browse by category</b>
          <span>Choose a category to narrow the list</span>
        </div>
        <span className="result-count">
          {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
        </span>
      </div>

      <Filters
        items={filterCategories}
        selected={category}
        onSelect={setCategory}
      />

      {isFiltering ? (
        filteredTools.length > 0 ? (
          <div className="tool-grid">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search aria-hidden="true" />
            <b>No matching tools</b>
            <p>Try another term or choose a different category.</p>
            <button
              className="button button-light"
              type="button"
              onClick={clearFilters}
            >
              Clear search and filters
            </button>
          </div>
        )
      ) : (
        Object.entries(toolGroups).map(([groupKey, group]) => (
          <section className="tool-group" key={groupKey}>
            <div className="group-head">
              <div className="group-title">
                <span className={`group-icon ${group.tone}`}>
                  <CategoryIcon group={groupKey} />
                </span>
                <div>
                  <h2>{group.label}</h2>
                  <small>{group.tools.length} tools to explore</small>
                </div>
              </div>
              <Link to={group.path}>
                View all <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>

            <div className="tool-grid">
              {allTools
                .filter((tool) => tool.group === groupKey)
                .slice(0, 4)
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
