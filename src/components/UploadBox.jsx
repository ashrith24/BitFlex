import { CloudUpload, FileImage, FileText } from "lucide-react";
import { useRef, useState } from "react";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

function formatMegabytes(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/** Drag-and-drop upload panel used on the landing page. */
export default function UploadBox() {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // Keep the selected file in the UI only; conversion is not implemented here.
  function acceptFile(selectedFile) {
    if (!selectedFile) return;

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("This file exceeds the 100MB limit. Choose a smaller file.");
      return;
    }

    setError("");
    setFile(selectedFile);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    acceptFile(event.dataTransfer.files[0]);
  }

  return (
    <div
      className={`upload-shell ${isDragging ? "dragging" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <div className="upload-inner">
        <div className="upload-art" aria-hidden="true">
          <FileImage />
          <FileText />
          <span className="cloud">
            <CloudUpload size={42} />
          </span>
        </div>

        <h3>{file ? file.name : "Drag & drop your file here"}</h3>
        <p>{file ? `${formatMegabytes(file.size)} selected` : "or"}</p>

        <button
          className="button button-primary choose"
          type="button"
          onClick={() => fileInput.current?.click()}
        >
          {file ? "Choose another file" : "Choose File"}
        </button>

        <input
          ref={fileInput}
          type="file"
          hidden
          onChange={(event) => acceptFile(event.target.files[0])}
        />
        <small className={error ? "upload-error" : ""} role="status">
          {error || "Max file size: 100MB"}
        </small>
      </div>
    </div>
  );
}
