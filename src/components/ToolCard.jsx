import { Link } from "react-router-dom";
import CategoryIcon from "./CategoryIcon.jsx";

/** Reusable card used by category listings, All Tools, and search results. */
export default function ToolCard({ tool, showCategory = false }) {
  const toolSlug = tool.name.toLowerCase().replaceAll(" ", "-");

  return (
    <Link
      to={`/tool/${encodeURIComponent(toolSlug)}`}
      className={`tool-card ${showCategory ? "result-card" : ""}`}
    >
      <span className={`tool-icon ${tool.tone}`}>
        <CategoryIcon group={tool.group} />
      </span>
      <b>{tool.name}</b>
      <span className="tool-desc">{tool.description}</span>

      {showCategory && (
        <span className={`result-category ${tool.tone}`}>
          {tool.category} Tool
        </span>
      )}
    </Link>
  );
}
