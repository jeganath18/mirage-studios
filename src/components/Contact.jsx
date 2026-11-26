import { useEffect, useRef, useState } from 'react';
import { CONTACT_URL } from '../data/site';
import HeroButton from './Buttons/HeroButton';

const HEADLINE = "Your brand’s next chapter starts here";
const words = HEADLINE.split(' ');

const START_RADIUS = 14;   // px, the small circle you see first
const CENTER_Y = 0.92;     // circle centre, as a fraction of viewport height
const OPEN_AT = 0.4;       // scroll progress where the circle is fully open

export default function Contact() {
  const wrap = useRef(null);
  const stage = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const st = stage.current;
    if (!el || !st) return;

    let ticking = false;

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const distance = el.offsetHeight - vh;
      const progress = Math.min(1, Math.max(0, -rect.top / distance));

      // distance from the circle centre to the farthest corner
      const cx = vw / 2;
      const cy = vh * CENTER_Y;
      const maxR = Math.hypot(Math.max(cx, vw - cx), Math.max(cy, vh - cy));

      const t = Math.min(1, progress / OPEN_AT);
      const eased = t * t * (3 - 2 * t); // smoothstep
      const r = progress <= 0 ? 0 : START_RADIUS + eased * (maxR - START_RADIUS);

      st.style.clipPath = `circle(${r}px at 50% ${CENTER_Y * 100}%)`;
      setIsVisible(progress >= OPEN_AT * 0.85);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  let charIndex = 0;

  return (
    <div ref={wrap} className="ct-wrap" id="contact">
      <div ref={stage} className="ct-stage">
        <section
          className={`ct ${isVisible ? 'is-visible' : ''}`}
          aria-label="Contact"
        >
          <h2 aria-label={HEADLINE} data-cursor="view">
            {words.map((word, wordIndex) => (
              <span className="wd" aria-hidden="true" key={wordIndex}>
                {Array.from(word).map((char) => {
                  const index = charIndex++;
                  return (
                    <span
                      className="ch"
                      key={index}
                      style={{ '--char-index': index }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            ))}
          </h2>

          <div className="mk">
            <img
              src="https://res.cloudinary.com/gqwrlg7y/image/upload/v1795531459/logo.svg"
              height={5}
              alt=""
              data-cursor="view"
            />
          </div>

          <div className="contact-cta mt-7" data-cursor="view">
            <HeroButton>Start the conversation</HeroButton>
          </div>
        </section>
      </div>
    </div>
  );
}