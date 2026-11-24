import { logoRows } from '../data/logos';

function Row({ logos, reverse }) {
  return (
    <div className={`row${reverse ? ' rev' : ''}`} data-cursor="view">
      {[0, 1].map((copy) =>
        logos.map((l) => (
          <div className="lg" key={`${copy}-${l.name}`} aria-hidden={copy ? 'true' : undefined}>
            {l.src ? <img src={l.src} alt={copy ? '' : l.name} loading="lazy" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : l.name}
          </div>
        ))
      )}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="logos" aria-label="Clients" id="logos">
      {logoRows.map((logos, i) => (
        <Row key={i} logos={logos} reverse={i === 0} />
      ))}
    </section>
  );
}
