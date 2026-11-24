export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const desktopMq = window.matchMedia('(min-width:900px)');
export const reduceMq = window.matchMedia('(prefers-reduced-motion:reduce)');
export const isFx = () => desktopMq.matches && !reduceMq.matches;
export const sectionProgress = (el) => {
  const r = el.getBoundingClientRect();
  return clamp(-r.top / (r.height - window.innerHeight));
};
