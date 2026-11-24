import { createElement, useEffect, useRef } from 'react';

/** Fades/slides children in once when scrolled into view. */
export default function Reveal({ as = 'div', className = '', delay = 0, left = false, style, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(
    as,
    { ref, className: `rv${left ? ' rvl' : ''} ${className}`.trim(), style: { '--d': `${delay}s`, ...style }, ...rest },
    children
  );
}
