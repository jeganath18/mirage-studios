import { useEffect, useRef, useState } from 'react';
import { testimonials } from '../data/testimonials';

const INTERVAL = 11000;

export default function Testimonials() {
  const wrap = useRef(null);
  const timer = useRef(null);
  const [cur, setCur] = useState(-1);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setCur(0);
        timer.current = setInterval(() => setCur((c) => (c + 1) % testimonials.length), INTERVAL);
        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(wrap.current);
    return () => {
      io.disconnect();
      clearInterval(timer.current);
    };
  }, []);

  const pick = (i) => {
    clearInterval(timer.current);
    setCur(i);
  };

  return (
    <section className="tm" aria-label="Testimonials">
      <div className="qm" aria-hidden="true"><span>“</span></div>
      <div className="tms" ref={wrap}>
        {testimonials.map((t, i) => (
          <figure key={t.name} className={`tq${cur === i ? ' on' : ''}`} style={{ margin: 0 }}>
            <p>
              “
              {t.text.split(' ').map((w, k, arr) => (
                <span key={k}>
                  <span className="w" style={{ '--i': k }}>{w}</span>
                  {k < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
              ”
            </p>
            <b>{t.name}</b>
            <small>{t.role}</small>
          </figure>
        ))}
      </div>
      <div className="tn" role="group" aria-label="Choose testimonial">
        {testimonials.map((t, i) => (
          <button key={t.name} aria-pressed={cur === i} onClick={() => pick(i)}>
            {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </button>
        ))}
      </div>
    </section>
  );
}
