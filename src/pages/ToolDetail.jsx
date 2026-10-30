import { ShieldCheck, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { allTools } from "../data/tools.js";

const maximumFileSize = 100 * 1024 * 1024;

/** Upload preview for a selected tool. Actual file conversion needs a service. */
export default function ToolDetail() {
  const { slug } = useParams();
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const tool = allTools.find(
    (item) => item.name.toLowerCase().replaceAll(" ", "-") === slug,
  );

  function acceptFile(selectedFile) {
    if (!selectedFile) return;

    if (selectedFile.size > maximumFileSize) {
      setFile(null);
      setError("This file exceeds the 100MB limit. Choose a smaller file.");
      return;
    }

    setFile(selectedFile);
    setError("");
  }

  return (
    <main className="wrap listing detail">
      <Link className="back-link" to={tool?.path ?? "/tools"}>
        ← Back to tools
      </Link>
      <h1>{tool?.name ?? "File Tool"}</h1>
      <p>{tool?.description ?? "Choose a tool to get started."}</p>

      <section className="detail-upload" aria-label="Upload a file">
        <UploadCloud size={42} aria-hidden="true" />
        <h3>{file ? file.name : "Upload a file to get started"}</h3>
        <p role="status">
          {error ||
            (file
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB selected`
              : "Maximum file size 100MB")}
        </p>
        <input
          ref={fileInput}
          type="file"
          hidden
          onChange={(event) => acceptFile(event.target.files[0])}
        />
        <button
          className="button button-primary"
          type="button"
          onClick={() => fileInput.current?.click()}
        >
          {file ? "Choose another file" : "Choose File"}
        </button>
      </section>

      <p className="notice">
        <ShieldCheck size={16} aria-hidden="true" />
        Files are processed securely. Conversion requires a connected processing
        service.
      </p>
    </main>
  );
}
