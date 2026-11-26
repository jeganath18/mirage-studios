import { useEffect, useRef, useState } from "react";
import { projects } from "../data/work";
import ProjectCarousel from "./ProjectCarousel";
import "./WorkGallery.css";

export default function Work() {
  const [active, setActive] = useState(-1);
  const cardRefs = useRef([]);

  const background =
    active === -1 ? "#ffffff" : projects[active].bg || "#ffffff";

  // Mobile accordion: after a card opens, bring it fully into view
  useEffect(() => {
    if (active === -1) return;
    if (!window.matchMedia("(max-width: 600px)").matches) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const t = setTimeout(() => {
      cardRefs.current[active]?.scrollIntoView({
        block: "nearest",
        behavior: reduce ? "auto" : "smooth",
      });
    }, 650); // after the height transition

    return () => clearTimeout(t);
  }, [active]);

return (
  <section
    className={`work-gallery-section ${
      active !== -1 ? "has-active-project" : ""
    }`}
    id="work"
    style={{
      backgroundColor: background,
      "--active-color": background,
    }}
  >
    <div className="work-gallery-sticky">

      <div className="work-gallery-header">
        <h1>Our Work</h1>
      </div>
      </div>

      <div className="work-gallery-container">
        <div className="work-gallery-heading">
          {/* <h2>Explore more work</h2>
          <span>SELECTED PROJECTS</span> */}
        </div>

        <div
          className={`work-gallery ${
            active !== -1 ? "project-selected" : ""
          }`}
        >
          {projects.map((p, i) => {
            const isActive = active === i;

            const images = p.images?.length
              ? p.images
              : p.image
              ? [p.image]
              : [];

            let position = "normal";
            if (active !== -1 && !isActive) {
              position = i < active ? "left" : "right";
            }

            return (
              <article
                key={p.name}
                ref={(el) => (cardRefs.current[i] = el)}
                aria-label={p.name}
                className={[
                  "work-gallery-card",
                  isActive ? "is-active" : "",
                  position !== "normal" ? `is-${position}` : "",
                ].join(" ")}
                onClick={() => setActive(i)}
                tabIndex={0}
                onBlur={(e) => {
                  if (
                    !e.currentTarget.parentElement?.contains(
                      e.relatedTarget
                    )
                  ) {
                    setActive(-1);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setActive(-1);
                  if (
                    (e.key === "Enter" || e.key === " ") &&
                    e.target === e.currentTarget
                  ) {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <div className="work-gallery-image">
                  <ProjectCarousel
                    images={images}
                    name={p.name}
                    active={isActive}
                  />

                  <div className="work-gallery-gradient" />

                  <div className="work-gallery-rail" aria-hidden="true">
                    <span>0{i + 1}</span>
                    <span>{p.name}</span>
                  </div>

                  <div className="work-gallery-overlay">
                    <div className="work-glass-panel">
                      <div className="glass-top">
                        <span>PROJECT 0{i + 1}</span>
                        <span className="glass-arrow" aria-hidden="true">
                          ↗
                        </span>
                        <button
                          type="button"
                          className="glass-close"
                          aria-label="Close project details"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActive(-1);
                            e.currentTarget.blur();
                          }}
                        >
                          Close ✕
                        </button>
                      </div>

                      <div className="glass-content">
                        <span className="glass-category">
                          {p.category}
                        </span>

                        <h3>{p.name}</h3>

                        <div className="glass-divider" />

                        <div className="glass-project">
                          <span>THE PROJECT</span>
                          <p>
                            {p.overview ||
                              p.projectOverview ||
                              p.description}
                          </p>
                        </div>

                        {p.deliverables?.length > 0 && (
                          <div className="glass-deliverables">
                            <span>DELIVERABLES</span>

                            <div className="deliverable-tags">
                              {p.deliverables.map((item, index) => (
                                <span key={index}>{item}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="glass-explore"
                            onClick={(e) => e.stopPropagation()}
                          >
                            EXPLORE PROJECT <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="work-gallery-footer">
          <span className="work-gallery-hint">CLICK TO EXPLORE ↗</span>
        </div>
      </div>
    </section>
  );
}