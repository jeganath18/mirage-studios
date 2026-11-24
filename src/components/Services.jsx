import { useRef } from 'react';
import { services } from '../data/services';
import { NAV } from '../data/site';
import { clamp, sectionProgress } from '../lib/motion';
import useScrollFrame from '../hooks/useScrollFrame';
import Reveal from './Reveal';

export default function Services() {
  const pin = useRef(null);
  const layers = useRef([]);
  const imgs = useRef([]);
  const infos = useRef([]);

 

useScrollFrame((fx, vh, isMobile) => {
  const n = services.length;

  // MOBILE: Disable scroll animation completely
  if (isMobile) {
    layers.current.forEach((d, i) => {
      if (!d || !imgs.current[i] || !infos.current[i]) return;

      d.style.transform = 'none';
      d.style.opacity = '1';
      d.style.visibility = 'visible';
      d.style.zIndex = 'auto';

      imgs.current[i].style.width = '100%';
      imgs.current[i].style.backgroundPosition = 'center center';

      infos.current[i].style.opacity = '1';
      infos.current[i].style.transform = 'none';
      infos.current[i].style.filter = 'none';
    });

    return;
  }

  // DESKTOP: Original animation
  if (!fx) {
    layers.current.forEach((d, i) => {
      if (!d || !imgs.current[i] || !infos.current[i]) return;

      d.style.transform = '';
      d.style.opacity = '';
      d.style.visibility = '';
      d.style.zIndex = '';

      // Important: Don't clear cssText here.
      // It would also erase the image backgroundImage.
      imgs.current[i].style.width = '';
      imgs.current[i].style.backgroundPosition = '';

      infos.current[i].style.cssText = '';
    });

    return;
  }

  const p = sectionProgress(pin.current) * n;

  layers.current.forEach((d, i) => {
    const u = p - i;
    const e = clamp((u + 0.3) / 0.3);
    const c = clamp((u - 0.1) / 0.4);
    const x = i < n - 1 ? clamp((u - 0.88) / 0.12) : 0;

    d.style.transform =
      `translateY(${(1 - e) * vh * 0.9}px) scale(${1 - x * 0.06})`;

    d.style.opacity = (e > 0 ? 1 : 0) * (1 - x);
    d.style.visibility = e > 0 && x < 1 ? 'visible' : 'hidden';
    d.style.zIndex = i;

    imgs.current[i].style.width =
      `calc(${100 - 54 * c}% - ${(100 - 54 * c) * 0.1}vw)`;

    imgs.current[i].style.backgroundPosition = `${50 + c * 20}% 50%`;

    infos.current[i].style.opacity = c;
    infos.current[i].style.transform =
      `translateX(${(1 - c) * 50}px)`;

    infos.current[i].style.filter =
      `blur(${(1 - c) * 6}px)`;
  });
});

  return (
    <section id="services" aria-label="Services">
      <div className="intro">
        <Reveal as="p">We help ambitious businesses turn</Reveal>
        <Reveal as="h2" delay={0.1}>Ideas into brands</Reveal>
        <Reveal as="p" delay={0.2}>Brands that are clear, consistent everywhere, and strong enough to grow over time</Reveal>
      </div>
      <div className="pin" id="sv" ref={pin}>
        <div className="stage">
          {services.map((s, i) => (
            <div className="sl" key={s.title} ref={(el) => (layers.current[i] = el)}>
              <div className="img ph" ref={(el) => (imgs.current[i] = el)}
                style={s.image ? { backgroundImage: `url(${s.image})`, backgroundSize: 'cover' } : undefined}>
                {!s.image && `Image placeholder: ${s.title}`}
              </div>
              <div className="info glass" ref={(el) => (infos.current[i] = el)}>
                {/* <span className="n">{s.number}</span> */}
                <h3>{s.title}</h3>
                <p style={{ marginTop: 10 }}>{s.description}</p>
                <ul aria-label="What’s Included">
                  {s.included.map((x) => <li key={x}>{x}</li>)}
                </ul>
                <p className="tl">Timeline: {s.timeline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
