# Mirage Studios

Vite + React single-page site.

```bash
npm i
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build
```

## Where to put your content
- `src/data/*.js`: all copy and placeholders (logos, work, services, FAQ, testimonials, social).
- Hero video: set `HERO_VIDEO` in `src/data/site.js` (file in `public/`, e.g. `/hero.mp4`).
- Client logos: fill `src` for each item in `src/data/logos.js` (files in `public/logos/`).
- Portfolio images: fill `image` in `src/data/work.js`; service images in `src/data/services.js`.
- Colors: CSS variables at the top of `src/styles/global.css`.

## Structure
- `components/`: one component per section.
- `hooks/`: `useScrollFrame` (rAF-throttled scroll loop), `useFxClass` (desktop pinning mode).
- `lib/motion.js`: media queries and scroll progress helpers.
- Pinned scrolling runs on screens 900px+ without reduced motion; elsewhere sections stack normally.
