/**
 * Single source of truth for the tools shown across the site.
 * Each category owns its route, theme color, and list of tools.
 */
export const toolGroups = {
  image: {
    label: "Image Tools",
    path: "/image-tools",
    tone: "blue",
    category: "Image",
    tools: [
      [
        "Image Converter",
        "Convert images to JPG, PNG, WebP and more.",
        "Convert",
      ],
      [
        "Image Compressor",
        "Reduce image size without losing quality.",
        "Compress",
      ],
      ["Resize Image", "Change image dimensions and scale.", "Edit"],
      ["Crop Image", "Crop images to your desired portion.", "Edit"],
      ["Rotate Image", "Rotate images at any angle.", "Edit"],
      ["Flip Image", "Flip images horizontally or vertically.", "Edit"],
      ["Change Format", "Convert image format instantly.", "Convert"],
      ["Remove Background", "Remove backgrounds automatically.", "Enhance"],
      ["Color Picker", "Pick a color from any image.", "Other"],
      ["Image to PDF", "Convert images to PDF files.", "Convert"],
      ["HEIC to JPG", "Convert HEIC images to JPG.", "Convert"],
      ["Watermark Image", "Add text or image watermark.", "Edit"],
    ],
  },
  pdf: {
    label: "PDF Tools",
    path: "/pdf-tools",
    tone: "pink",
    category: "PDF",
    tools: [
      ["PDF to Word", "Convert PDF to editable Word documents.", "Convert"],
      ["Word to PDF", "Convert Word documents to PDF files.", "Convert"],
      ["PDF to Excel", "Extract data from PDF to Excel.", "Convert"],
      ["Excel to PDF", "Convert Excel spreadsheets to PDF.", "Convert"],
      ["PDF to JPG", "Convert PDF pages to JPG images.", "Convert"],
      ["JPG to PDF", "Convert images to PDF.", "Convert"],
      ["Merge PDF", "Merge multiple PDF files.", "Organize"],
      ["Split PDF", "Split a PDF into multiple files.", "Organize"],
      ["Compress PDF", "Reduce PDF file size.", "Optimize"],
      ["Rotate PDF", "Rotate PDF pages.", "Edit"],
      ["Unlock PDF", "Remove password from PDF.", "Security"],
      ["Protect PDF", "Add password protection.", "Security"],
    ],
  },
  document: {
    label: "Document Tools",
    path: "/document-tools",
    tone: "green",
    category: "Document",
    tools: [
      ["Word to PDF", "Convert Word documents to PDF.", "Convert"],
      ["PDF to Word", "Convert PDF to Word documents.", "Convert"],
      ["Excel to PDF", "Convert spreadsheets to PDF.", "Convert"],
      ["PDF to Excel", "Extract tables from PDF to Excel.", "Convert"],
      ["PPT to PDF", "Convert PowerPoint to PDF.", "Convert"],
      ["PDF to PPT", "Convert PDF to PowerPoint.", "Convert"],
      ["Text to PDF", "Convert text files to PDF.", "Convert"],
      ["HTML to PDF", "Convert web pages to PDF.", "Convert"],
      ["ODT to PDF", "Convert ODT files to PDF.", "Convert"],
      ["RTF to PDF", "Convert RTF files to PDF.", "Convert"],
      ["CSV to Excel", "Convert CSV files to Excel.", "Convert"],
      ["XML to Excel", "Convert XML files to Excel.", "Convert"],
    ],
  },
  media: {
    label: "Video & Audio Tools",
    path: "/video-audio-tools",
    tone: "purple",
    category: "Video",
    tools: [
      ["Video Converter", "Convert videos to MP4, MOV, AVI and more.", "Video"],
      ["Video Compressor", "Compress video without losing quality.", "Video"],
      ["Video to MP3", "Extract audio from video files.", "Video"],
      ["Audio Converter", "Convert audio to MP3, WAV, AAC and more.", "Audio"],
      ["Audio Compressor", "Compress audio files.", "Audio"],
      ["Merge Video", "Merge multiple video files.", "Video"],
      ["Trim Video", "Cut and trim video clips.", "Video"],
      ["Rotate Video", "Rotate videos at any angle.", "Video"],
      ["MP4 to GIF", "Convert MP4 videos to GIF.", "Video"],
      ["Add Subtitles", "Add subtitles to video files.", "Video"],
      ["Change Resolution", "Change video resolution.", "Video"],
      ["Change Speed", "Speed up or slow down videos.", "Video"],
    ],
  },
  other: {
    label: "Other Utilities",
    path: "/other-tools",
    tone: "orange",
    category: "Other",
    tools: [
      ["QR Code Generator", "Generate custom QR codes.", "Generate"],
      ["Hash Generator", "Generate MD5, SHA1, SHA256 and more.", "Generate"],
      ["File Compressor", "Compress files into ZIP.", "Manage"],
      ["File Extractor", "Extract ZIP, RAR and more.", "Manage"],
      [
        "File Converter",
        "Convert files from one format to another.",
        "Convert",
      ],
      ["Unit Converter", "Convert between different units.", "Convert"],
      ["Image to Text", "Extract text from images (OCR).", "Convert"],
      ["Text to Speech", "Convert text to speech.", "Audio"],
      ["Speech to Text", "Convert speech to text.", "Audio"],
      ["Base64 Encoder", "Encode text to Base64.", "Other"],
      ["Base64 Decoder", "Decode Base64 to text.", "Other"],
      ["Lorem Ipsum Generator", "Generate lorem ipsum text.", "Other"],
    ],
  },
};

/** Flatten category data into searchable tool records. */
export const allTools = Object.entries(toolGroups).flatMap(([group, data]) =>
  data.tools.map(([name, description, subcategory], index) => ({
    id: `${group}-${index}`,
    name,
    description,
    subcategory,
    group,
    path: data.path,
    tone: data.tone,
    category:
      group === "media" && subcategory === "Audio" ? "Audio" : data.category,
  })),
);

/** Search each word separately so queries like "compress image" also match. */
export function matchesTool(tool, query) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const searchableText = [
    tool.name,
    tool.description,
    tool.category,
    tool.subcategory,
  ]
    .join(" ")
    .toLowerCase();

  return words.every(
    (word) =>
      searchableText.includes(word) ||
      (word === "compress" && searchableText.includes("compressor")),
  );
}

/** Format groups displayed on the landing page. */
export const supportedFormats = [
  {
    title: "Images",
    details: "JPG, PNG, WEBP, GIF, BMP, TIFF and more",
    group: "image",
  },
  { title: "PDF", details: "PDF to Word, Excel, JPG and more", group: "pdf" },
  {
    title: "Documents",
    details: "Word, Excel, PPT, TXT and more",
    group: "document",
  },
  { title: "Audio", details: "MP3, WAV, AAC, OGG and more", group: "media" },
  { title: "Video", details: "MP4, AVI, MOV, MKV and more", group: "media" },
  { title: "Archives", details: "ZIP, RAR, 7Z, TAR and more", group: "other" },
];
