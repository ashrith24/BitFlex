import {
  AudioLines,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Film,
  SlidersHorizontal,
} from "lucide-react";

const artworkByGroup = {
  image: [FileImage, FileImage, FileImage],
  pdf: [FileText, FileText, FileText],
  document: [FileSpreadsheet, FileText, FileText],
  media: [Film, FileVideo, AudioLines],
  other: [FileArchive, SlidersHorizontal, FileText],
};

/** Small layered-file illustration for category page banners. */
export default function CategoryArt({ group }) {
  const icons = artworkByGroup[group] ?? artworkByGroup.other;

  return (
    <div className="banner-art" aria-hidden="true">
      <span className="art-orbit orbit-one" />
      <span className="art-orbit orbit-two" />
      {icons.map((Icon, index) => (
        <span className={`art-file art-file-${index + 1}`} key={index}>
          <Icon />
        </span>
      ))}
    </div>
  );
}
