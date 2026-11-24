
import { useEffect, useRef } from 'react';
import { isFx, desktopMq, reduceMq } from '../lib/motion';

/**
 * Calls cb(fx, viewportHeight, isMobile)
 * on mount, scroll, resize and media changes.
 * Uses requestAnimationFrame throttling.
 */
export default function useScrollFrame(cb) {
  const ref = useRef(cb);
  ref.current = cb;

  useEffect(() => {
    let queued = false;

    const run = () => {
      const isMobile = window.innerWidth <= 768;
      ref.current(isFx(), window.innerHeight, isMobile);
    };

    const req = () => {
      if (queued) return;

      queued = true;

      requestAnimationFrame(() => {
        queued = false;
        run();
      });
    };

    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);

    desktopMq.addEventListener('change', req);
    reduceMq.addEventListener('change', req);

    run();

    return () => {
      window.removeEventListener('scroll', req);
      window.removeEventListener('resize', req);

      desktopMq.removeEventListener('change', req);
      reduceMq.removeEventListener('change', req);
    };
  }, []);
}
