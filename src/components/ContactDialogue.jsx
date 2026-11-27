import { useEffect, useRef, useState } from "react";
import "./ContactDialogue.css";
import HeroButton from "./Buttons/HeroButton";

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-6-6l2-2-3-5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default function ContactDialog({ open = true, onClose = () => {} }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Keep the latest onClose without re-running the effect on every parent render
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mailto = `mailto:hello@mirage-studios.com?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;

    window.location.href = mailto;
    setStatus("Your email application is opening...");
  };

  return (
    <div
      className="contact-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-heading"
      >
        {/* Close button lives on the dialog itself so it never scrolls away */}
        <button
          className="contact-close"
          onClick={onClose}
          aria-label="Close contact dialog"
          type="button"
        >
          <CloseIcon />
        </button>

        {/* Left information panel (hidden on mobile) */}
        <aside className="contact-sidebar">
          <div className="contact-window-controls" aria-hidden="true">
            <span className="window-dot" />
            <span className="window-dot" />
            <span className="window-dot" />
          </div>

          <div className="contact-sidebar-content">
            <h2>Let's create something meaningful together.</h2>

            <p className="contact-description">
              We're always looking for new challenges and opportunities. Get in
              touch with us to discuss your project.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-icon">
                  <MailIcon />
                </span>
                <div>
                  <h3>Reach out</h3>
                  <p>Drop us a message anytime.</p>
                  <a href="mailto:hello@mirage-studios.com">
                    hello@mirage-studios.com
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-icon">
                  <PhoneIcon />
                </span>
                <div>
                  <h3>Give us a call</h3>
                  <p>Let's talk about your next big idea.</p>
                  <a href="tel:+919940037175">+91 99400 37175</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-office">
            {/* <img src={OFFICE_IMAGE} alt="Modern creative office" /> */}
            <div className="contact-office-overlay">
              <span>GOOD IDEAS START WITH A CONVERSATION.</span>
              <span>CHENNAI, INDIA</span>
            </div>
          </div>
        </aside>

        {/* Right form panel */}
        <main className="contact-main">
          <div className="contact-form-wrapper">
            <header className="contact-form-header">
              <span className="contact-eyebrow contact-form-eyebrow">
                HAVE A PROJECT IN MIND?
              </span>

              <h1 id="contact-heading">
                Let's talk <span>business.</span>
              </h1>

              <p className="contact-form-intro">
                You can reach us anytime via{" "}
                <a href="mailto:hello@mirage-studios.com">
                  hello@mirage-studios.com
                </a>
              </p>
            </header>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What's on your mind?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field contact-field-grow">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us a little about your project..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <HeroButton onClick={handleSubmit}>
                Send
              </HeroButton>

              {status && (
                <p className="contact-status" role="status">
                  {status}
                </p>
              )}
            </form>

            <div className="contact-form-footer">
              <span>© MIRAGE STUDIOS</span>
              <span>LET'S MAKE IT HAPPEN.</span>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}