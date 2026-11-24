import { useLayoutEffect } from 'react';
import { isFx, desktopMq, reduceMq } from '../lib/motion';

/** Toggles the `fx` class on <html> to enable desktop pinned storytelling. */
export default function useFxClass() {
  useLayoutEffect(() => {
    const apply = () => document.documentElement.classList.toggle('fx', isFx());
    apply();
    desktopMq.addEventListener('change', apply);
    reduceMq.addEventListener('change', apply);
    return () => {
      desktopMq.removeEventListener('change', apply);
      reduceMq.removeEventListener('change', apply);
    };
  }, []);
}
