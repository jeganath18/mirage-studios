
import { NAV, SOCIAL, CONTACT_URL } from "../data/site";
import Reveal from "./Reveal";
import { useState } from "react";
export default function Footer() {
  const [copied, setCopied] = useState(false);

  const email = "hello@mirage-studios.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };
  return (
    <footer>
      <Reveal as="h2">
        Let’s Build Something<span>That Lasts.</span>
      </Reveal>
      <Reveal as="a" className="btn" delay={0.15} href={CONTACT_URL}>
        Book a Session{" "}
        <span className="ar" aria-hidden="true">
          →
        </span>
      </Reveal>
      <Reveal className="fg" delay={0.2}>
        <div className="reach-out">
          <h4>Reach out</h4>

          <div className="email-row">
            <a href={`mailto:${email}`}>{email}</a>

            <button
              type="button"
              className="copy-email"
              onClick={handleCopy}
              aria-label="Copy email address"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <div>
          <h4>Navigate</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <p className="cp">© 2026 Mirage Studios. All rights reserved.</p>
      <Reveal className="big" aria-hidden="true">
        Mirage Studios
      </Reveal>
    </footer>
  );
}
