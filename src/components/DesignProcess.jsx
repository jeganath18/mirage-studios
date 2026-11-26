import { useEffect, useRef, useState } from "react";
import "./DesignProces.css";

const fallingElements = [
  { type: "circle", left: "8%", delay: "0s", duration: "7s", size: "400px" },
  { type: "plus", left: "19%", delay: "2s", duration: "8s", size: "500px" },
  { type: "square", left: "31%", delay: "1s", duration: "9s", size: "500px" },
  { type: "line", left: "43%", delay: "3s", duration: "7s", size: "450px" },
  { type: "circle", left: "56%", delay: "1.5s", duration: "8s", size: "320px" },
  { type: "plus", left: "68%", delay: "4s", duration: "9s", size: "210px" },
  { type: "square", left: "79%", delay: "2.5s", duration: "7s", size: "400px" },
  { type: "circle", left: "91%", delay: "0.5s", duration: "8s", size: "320px" },
];

const description =
  "We follow a clear, collaborative process that gives every project direction, clarity, and intentional design outcomes.";

const steps = [
  {
    number: "01",
    title: "Discovery",
    tag: "Understand the foundation",
    description:
      "We begin by understanding your business, goals, audience, and creative context so the work starts on a firm strategic footing.",
  },
  {
    number: "02",
    title: "Direction",
    tag: "Define the vision",
    description:
      "Early ideas are explored, refined, and aligned with purpose - defining visual language, mood, and design intent before full execution.",
  },
  {
    number: "03",
    title: "Design",
    tag: "Bring ideas to life",
    description:
      "We craft thoughtful solutions across identity, logo, packaging, and collaterals - refining with your feedback until each detail feels right.",
  },
  {
    number: "04",
    title: "Delivery",
    tag: "Ready for the world",
    description:
      "Polished final assets are delivered in production-ready formats with guidance for application and execution.",
  },
];

export default function DesignProcess() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [typedText, setTypedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Heading description typing animation
  useEffect(() => {
    if (!isVisible) {
      setTypedText("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(description.slice(0, index));

      if (index >= description.length) {
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Scroll controls: heading trigger + timeline steps
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    // Step i activates at progress = i * STEP_GAP.
    // With 0.22, Delivery appears at 66% of the scroll; the remaining
    // ~34% keeps the section pinned so Delivery finishes before unpinning.
    const STEP_GAP = 0.22;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = rect.top + window.scrollY;
      const scrollableDistance = section.offsetHeight - vh;

      // Heading animates only once the pinned stage is actually on screen,
      // and resets when the section is left so it can replay.
      setIsVisible(rect.top < vh * 0.4 && rect.bottom > vh * 0.6);

      if (scrollableDistance > 0) {
        const distanceScrolled = window.scrollY - sectionTop;
        const progress = Math.max(
          0,
          Math.min(1, distanceScrolled / scrollableDistance),
        );

        if (distanceScrolled < 0) {
          setActiveStep(-1);
        } else {
          setActiveStep(
            Math.min(steps.length - 1, Math.floor(progress / STEP_GAP)),
          );
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const fillPercent =
    activeStep <= 0 ? 0 : (activeStep / (steps.length - 1)) * 100;

  return (
    <section ref={sectionRef} className="design-process dp-scroll-section">
      <div className="dp-stage">
        {/* Falling background */}
        <div className="dp-gradient dp-gradient-three" />

        <div className="dp-falling-elements" aria-hidden="true">
          {fallingElements.map((element, index) => (
            <span
              key={index}
              className={`dp-fall dp-fall-${element.type}`}
              style={{
                left: element.left,
                animationDelay: element.delay,
                animationDuration: element.duration,
                width: element.size,
                height: element.size,
              }}
            />
          ))}
        </div>

        {/* Animated heading */}
        <div className="dp-content">
          <div className="dp-heading">
            <h1
              className={`dp-word dp-design ${
                isVisible ? "dp-heading-active" : ""
              }`}
              data-cursor="view"
            >
              Design
            </h1>

            <h1
              className={`dp-word dp-process ${
                isVisible ? "dp-heading-active" : ""
              }`}
              data-cursor="view"
            >
              Process
            </h1>
          </div>

          <div className="dp-description">
            <p>
              {typedText}
              <span className="dp-cursor" aria-hidden="true" />
            </p>
          </div>
        </div>

        {/* Timeline: horizontal on desktop, vertical on mobile */}
        <div className="dp-timeline-wrapper">
          <div className="dp-timeline">
            <div className="dp-timeline-track">
              <div
                className="dp-timeline-fill"
                style={{ "--fill": `${fillPercent}%` }}
              />
            </div>

            {steps.map((step, index) => {
              const revealed = activeStep >= index;
              const current = activeStep === index;

              return (
                <div
                  key={step.number}
                  className={[
                    "dp-timeline-item",
                    index % 2 === 0 ? "dp-enter-bottom" : "dp-enter-top",
                    revealed ? "dp-revealed" : "",
                    current ? "dp-current" : "",
                  ].join(" ")}
                >
                  <div className="dp-timeline-top">
                    <span className="dp-timeline-number">{step.number}</span>

                    <div className="dp-timeline-dot">
                      <span />
                    </div>
                  </div>

                  <div className="dp-timeline-content">

                    <h2>{step.title}</h2>

                    <p>{step.description}</p>

                    <span className="dp-timeline-decoration" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}