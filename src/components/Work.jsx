
import { useRef, useState } from "react";
import { projects } from "../data/work";
import { sectionProgress } from "../lib/motion";
import useScrollFrame from "../hooks/useScrollFrame";
import ProjectCarousel from "./ProjectCarousel";

export default function Work() {
  const pin = useRef(null);
  const [active, setActive] = useState(0);

  useScrollFrame((fx) => {
    const el = pin.current;
    if (!el) return;

    if (!fx) {
      el.style.background = "";
      return;
    }

    const a = Math.min(
      projects.length - 1,
      Math.floor(sectionProgress(el) * projects.length)
    );

    setActive((prev) => (prev === a ? prev : a));
    el.style.background = projects[a].bg;

    const next = projects[a + 1];
    if (next?.image) new Image().src = next.image;
  });

  return (
    <section id="work" aria-label="Our work">
      <div className="wk pin" id="wk" ref={pin}>
        <div className="stage">
          <h2 className="wt">Our Work</h2>

          {projects.map((p, i) => (
            <article
              className={`pj${i === active ? " on" : ""}`}
              key={p.name}
            >
              <div>
                <span>
                  0{i + 1} / 0{projects.length}
                </span>

                <h3>{p.name}</h3>
                <p>{p.category}</p>

                <p style={{ color: "#4a4b4d", textAlign: "justify" }}>
                  {p.description}
                </p>
              </div>

              <ProjectCarousel
                images={
                  p.images?.length
                    ? p.images
                    : p.image
                    ? [p.image]
                    : []
                }
                name={p.name}
              />
            </article>
          ))}

          {/* Scroll guidance */}
          {active < projects.length - 1 && (
            <div className="work-scroll-hint">
              {/* <span className="scroll-line"></span> */}
              <span>SCROLL TO EXPLORE</span>
              <span className="scroll-arrow">↓</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
