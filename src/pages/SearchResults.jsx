import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "../components/Filters.jsx";
import ToolCard from "../components/ToolCard.jsx";
import { allTools, matchesTool } from "../data/tools.js";

const categories = ["Image", "PDF", "Document", "Video", "Audio", "Other"];
const pageSize = 8;

/** Search view with category counts and simple pagination. */
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") ?? "";
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const matchingTools = allTools.filter((tool) => matchesTool(tool, query));
  const visibleTools = matchingTools.filter(
    (tool) => category === "All" || tool.category === category,
  );
  const pageCount = Math.ceil(visibleTools.length / pageSize);
  const pageTools = visibleTools.slice((page - 1) * pageSize, page * pageSize);
  const resultCounts = ["All", ...categories].map((name) => ({
    name,
    count:
      name === "All"
        ? matchingTools.length
        : matchingTools.filter((tool) => tool.category === name).length,
  }));

  function clearSearch() {
    navigate("/search");
  }

  return (
    <main className="wrap listing search-results">
      <form className="searchbox" action="/search" role="search">
        <Search aria-hidden="true" />
        <input name="q" defaultValue={query} placeholder="Search tools..." />
        <button type="button" onClick={clearSearch} aria-label="Clear search">
          <X aria-hidden="true" />
        </button>
      </form>

      <h1>
        Search Results for <span>“{query}”</span>
      </h1>

      <div className="filters" role="group" aria-label="Filter search results">
        {resultCounts
          .filter((result) => result.count > 0)
          .map((result) => (
            <button
              type="button"
              key={result.name}
              className={category === result.name ? "active" : ""}
              aria-pressed={category === result.name}
              onClick={() => {
                setCategory(result.name);
                setPage(1);
              }}
            >
              {result.name} <span>{result.count}</span>
            </button>
          ))}
      </div>

      <div className="result-list">
        {pageTools.length > 0 ? (
          pageTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} showCategory />
          ))
        ) : (
          <div className="empty-state">
            <Search aria-hidden="true" />
            <b>No matching tools</b>
            <p>Try a different search term or clear your search.</p>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <nav className="pagination" aria-label="Search result pages">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            ‹
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                aria-current={page === pageNumber ? "page" : undefined}
                className={page === pageNumber ? "active" : ""}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label="Next page"
            disabled={page === pageCount}
            onClick={() =>
              setPage((current) => Math.min(pageCount, current + 1))
            }
          >
            ›
          </button>
        </nav>
      )}
    </main>
  );
}
