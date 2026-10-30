import {
  ArrowRight,
  AudioLines,
  CloudUpload,
  Download,
  FileArchive,
  FileImage,
  FileText,
  Film,
  LockKeyhole,
  Monitor,
  Play,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import UploadBox from "../components/UploadBox.jsx";
import { supportedFormats, toolGroups } from "../data/tools.js";
import { Link } from "react-router-dom";

const formatIcons = {
  image: FileImage,
  pdf: FileText,
  document: FileText,
  media: AudioLines,
  video: Film,
  other: FileArchive,
};

const steps = [
  {
    title: "Upload File",
    description: "Select or drag & drop your file",
    Icon: CloudUpload,
  },
  {
    title: "Choose Options",
    description: "Select the format and settings you need",
    Icon: SlidersHorizontal,
  },
  {
    title: "Convert",
    description: "We'll process your file instantly",
    Icon: RefreshCw,
  },
  {
    title: "Download",
    description: "Download your converted file in seconds",
    Icon: Download,
  },
];

/** Landing page: explains the service, upload flow, and supported formats. */
export default function Home() {
  return (
    <>
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="trust-pill">
              <ShieldCheck size={16} aria-hidden="true" />
              100% Free <i /> Secure <i /> No Sign Up
            </div>

            <h1>
              Convert Your Files
              <br />
              <span>Easily</span> &amp; Instantly
            </h1>
            <p className="hero-lead">
              Convert, compress, edit, and manage your files in one place. Fast,
              simple and secure.
            </p>

            <div className="benefits" aria-label="FileConvert benefits">
              <span>
                <Zap aria-hidden="true" />
                Fast Processing
              </span>
              <span>
                <LockKeyhole aria-hidden="true" />
                Secure &amp; Private
              </span>
              <span>
                <Monitor className="device" aria-hidden="true" />
                Works on Any Device
              </span>
            </div>

            <div className="hero-buttons">
              <Link className="button button-primary" to="/tools">
                Explore All Tools <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a className="button button-light" href="#how">
                <Play size={16} aria-hidden="true" /> How It Works
              </a>
            </div>
          </div>

          <UploadBox />
        </section>

        <section className="formats wrap" aria-labelledby="formats-title">
          <h2 id="formats-title">Supported Formats</h2>
          <p>
            We support a wide range of file formats for all your conversion
            needs.
          </p>
          <div className="format-grid">
            {supportedFormats.map((format) => {
              const Icon = formatIcons[format.group];
              const path = toolGroups[format.group].path;

              return (
                <Link
                  className={`format-card ${format.group}`}
                  to={path}
                  key={format.title}
                >
                  <Icon aria-hidden="true" />
                  <b>{format.title}</b>
                  <span>{format.details}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="how" className="how" aria-labelledby="how-title">
          <div className="wrap">
            <h2 id="how-title">How It Works</h2>
            <div className="steps">
              {steps.map(({ title, description, Icon }, index) => (
                <div className="step" key={title}>
                  <span className="step-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <b>
                      {index + 1}. {title}
                    </b>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
