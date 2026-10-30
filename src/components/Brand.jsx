import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

/** Shared FileConvert logo used by the header and footer. */
export default function Brand() {
  return (
    <Link className="brand" to="/" aria-label="FileConvert home">
      <span className="brand-mark">
        <FileText size={19} aria-hidden="true" />
      </span>
      <span>FileConvert</span>
    </Link>
  );
}
