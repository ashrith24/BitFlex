import { AtSign, Camera, Globe2, Play, Share2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Brand from "./Brand.jsx";

const toolLinks = [
  ["All Tools", "/tools"],
  ["Image Tools", "/image-tools"],
  ["PDF Tools", "/pdf-tools"],
  ["Document Tools", "/document-tools"],
  ["Video Tools", "/video-audio-tools"],
  ["Other Tools", "/other-tools"],
];

/** Site footer with navigation, newsletter, and social links. */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function subscribe(event) {
    event.preventDefault();
    if (!email.trim()) return;

    setEmail("");
    setMessage("Thanks for subscribing!");
  }

  return (
    <footer className="footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Your all-in-one file converter and productivity toolkit.</p>
        </div>

        <div className="footer-links">
          <b>Tools</b>
          {toolLinks.map(([label, path]) => (
            <Link to={path} key={path}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-links">
          <b>Company</b>
          <a href="#about">About Us</a>
          <a href="#blog">Blog</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>

        <div className="footer-links">
          <b>Support</b>
          <a href="#help">Help Center</a>
          <a href="#faq">FAQs</a>
          <a href="/#how">How It Works</a>
          <a href="#feedback">Feedback</a>
        </div>

        <div className="newsletter">
          <b>Stay Connected</b>
          <p>Get updates and productivity tips.</p>
          <form onSubmit={subscribe}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="button button-primary" type="submit">
              Subscribe
            </button>
          </form>
          <small role="status">{message}</small>

          <div className="socials" aria-label="Social media">
            <a href="#twitter" aria-label="Twitter">
              <Share2 />
            </a>
            <a href="#facebook" aria-label="Facebook">
              <Globe2 />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <Camera />
            </a>
            <a href="#youtube" aria-label="YouTube">
              <Play />
            </a>
            <a href="#linkedin" aria-label="LinkedIn">
              <AtSign />
            </a>
          </div>
        </div>
      </div>

      <div className="wrap copyright">
        <span>© 2024 FileConvert. All rights reserved.</span>
        <span>
          Made with <b>♥</b> for productivity
        </span>
      </div>
    </footer>
  );
}
