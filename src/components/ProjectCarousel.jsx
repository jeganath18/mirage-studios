
import { useEffect, useState } from "react";

export default function ProjectCarousel({
  images = [],
  name,
  active = false,
}) {
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    setCurrent(0);
    setProgressKey((prev) => prev + 1);
  }, [images, active]);

  useEffect(() => {
    if (!active || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
      setProgressKey((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [active, images.length, progressKey]);

  const goToSlide = (index) => {
    setCurrent(index);
    setProgressKey((prev) => prev + 1);
  };

  if (!images.length) {
    return <div className="img ph">Image placeholder: {name}</div>;
  }

  return (
    <div className="img ph project-carousel">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`${name} - Image ${index + 1}`}
          className={`carousel-image ${
            index === current ? "active" : ""
          }`}
          loading="lazy"
        />
      ))}

      {active && images.length > 1 && (
        <div className="carousel-pagination">

          <div className="carousel-progress-bars">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`carousel-progress-segment ${
                  index === current ? "active" : ""
                } ${index < current ? "completed" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(index);
                }}
                aria-label={`Show image ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
              >
                <span
                  key={index === current ? progressKey : "static"}
                  className={
                    index === current
                      ? "carousel-segment-fill"
                      : ""
                  }
                />
              </button>
            ))}
          </div>

          <span className="carousel-count">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>

        </div>
      )}
    </div>
  );
}
