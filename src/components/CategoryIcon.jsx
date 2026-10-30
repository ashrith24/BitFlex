import {
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Film,
  SlidersHorizontal,
} from "lucide-react";

const iconsByGroup = {
  image: FileImage,
  pdf: FileText,
  document: FileSpreadsheet,
  media: Film,
  other: FileArchive,
};

/** Returns a consistent Lucide icon for a tool's category. */
export default function CategoryIcon({ group }) {
  const Icon = iconsByGroup[group] ?? SlidersHorizontal;
  return <Icon aria-hidden="true" />;
}
