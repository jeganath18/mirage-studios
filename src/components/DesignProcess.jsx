
import React, { useEffect, useRef, useState } from "react";
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

const DesignProcess = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setTypedText("");
      return;
    }

    let index = 0;
    setTypedText("");

    const typingInterval = setInterval(() => {
      index++;
      setTypedText(description.slice(0, index));

      if (index >= description.length) {
        clearInterval(typingInterval);
      }
    }, 28);

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`design-process ${isVisible ? "is-visible" : ""}`}
    >
      {/* Soft background gradients */}
      {/* <div className="dp-gradient dp-gradient-one" />
      <div className="dp-gradient dp-gradient-two" /> */}
      <div className="dp-gradient dp-gradient-three" />

      {/* Falling decorative elements */}
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

      {/* Main content */}
      <div className="dp-content">
        <div className="dp-heading">
          <h1 className="dp-word dp-design" data-cursor="view">Design</h1>
          <h1 className="dp-word dp-process" data-cursor="view">Process</h1>
        </div>

        <div className="dp-description">
          <p>
            {typedText}
            <span className="dp-cursor" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
