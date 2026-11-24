
import { useEffect, useRef, useState } from 'react';
import { CONTACT_URL } from '../data/site';
import HeroButton from './Buttons/HeroButton';

const HEADLINE = "Your brand’s next chapter starts here";
const words = HEADLINE.split(' ');

export default function Contact() {
  const section = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = section.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.01,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  let charIndex = 0;

  return (
    <section
      ref={section}
      className={`ct ${isVisible ? 'is-visible' : ''}`}
      id="contact"
      aria-label="Contact"
    >
      <h2 aria-label={HEADLINE}>
        {words.map((word, wordIndex) => (
          <span
            className="wd"
            aria-hidden="true"
            key={wordIndex}
          >
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
        <img src="/mirage_logo/light.svg" height={5} alt="" />
      </div>

      <div className="contact-cta mt-7">
        <HeroButton children='Start the conversation'></HeroButton>
      </div>
    </section>
  );
}
