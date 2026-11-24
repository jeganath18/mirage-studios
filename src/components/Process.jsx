import { useRef } from 'react';
import { steps } from '../data/process';
import { clamp, sectionProgress } from '../lib/motion';
import useScrollFrame from '../hooks/useScrollFrame';
import DesignProcess from './DesignProcess';

export default function Process() {
  const pin = useRef(null);
  const cards = useRef([]);

  useScrollFrame((fx, vh) => {
    if (!fx) {
      cards.current.forEach((d) => (d.style.cssText = 'background:rgba(255,255,255,.7)'));
      return;
    }
    const p = sectionProgress(pin.current) * steps.length;
    cards.current.forEach((d, i) => {
      const e = clamp(p - i + 0.15);
      const n = clamp(p - i - 1 + 0.15);
      d.style.left = `${steps[i].left}vw`;
      d.style.top = `${14 + i * 11}vh`;
      d.style.marginLeft = i % 2 ? '6vw' : '0';
      d.style.transform = `translateY(${(1 - e) * vh * 1.1}px) scale(${1 - n * 0.04})`;
      d.style.opacity = e > 0 ? 1 - n * 0.35 : 0;
      d.style.zIndex = i;
    });
  });

  return (
    <section id="process" aria-label="Our process">
      <div className="pr pin" id="pr" ref={pin}>
      <DesignProcess></DesignProcess>
        <div className="stage">
          {steps.map((s, i) => (
            <div className="pc glass" key={s.title} ref={(el) => (cards.current[i] = el)} style={{ background: 'rgba(255,255,255,.7)' }} data-cursor="view">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
