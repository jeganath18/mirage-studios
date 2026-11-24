
import { useState } from 'react';
import { faq } from '../data/faq';
import Reveal from './Reveal';

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  return (
    <section className="fq" aria-label="FAQ">
      <div>
        <Reveal as="h2" left>
          Frequently Asked Questions
        </Reveal>

        <Reveal as="p" left delay={0.15} className="s">
          Have more questions? Reach out to us, and our team will be
          happy to assist you!
        </Reveal>
      </div>

      <div>
        {faq.map((item, i) => {
          const isOpen = open === i;

          return (
            <div
              key={item.q}
              className={`it ${isOpen ? 'open' : ''}`}
            >
              <h3>
                <button
                  type="button"
                  id={`faq-b${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="nn">0{i + 1}</span>
                  <span>{item.q}</span>
                  <span className="pm" aria-hidden="true" />
                </button>
              </h3>

              <div
                className="ans"
                id={`faq-a${i}`}
                role="region"
                aria-labelledby={`faq-b${i}`}
                aria-hidden={!isOpen}
              >
                <div>
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
