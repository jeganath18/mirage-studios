import { useEffect, useState } from "react";
import { NAV, HERO_VIDEO } from "../data/site";
import HeroButton from "../components/Buttons/HeroButton";

const TICKER_COPIES = 8;

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="clk" aria-label="Local time and working hours">
      {now.toLocaleTimeString("en-US")} | 10:00 AM – 6:00 PM
    </div>
  );
}

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <header className="hero" id="home">
      <div className="hl">
        <div>
          <nav className="nav" aria-label="Main">
            <img src="https://res.cloudinary.com/gqwrlg7y/image/upload/v1795531459/logo.svg" height={5} alt="" />
            <ul>
              {NAV.map((n) => (
                <li key={n.label}>
                  <a className="l" href={n.href}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <Clock />
          </nav>
        </div>
        <div className="hc">
          <h1>
            Big ideas, <br />
            Bolder Brands
          </h1>
          <p className="sub">Brand identities and packaging for start-ups</p>
          <div className="mt-5 contact">
            <HeroButton>
              Contact Us
            </HeroButton>
          </div>
        </div>
        <div className="tick" aria-label="Availability">
          <div className="tk">
            {Array.from({ length: TICKER_COPIES }, (_, i) => (
              <span key={i}>
                <i>•</i> We have 2 spots left for November —{" "}
                <a href="#contact">Contact Us</a>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="hr">
        <div className="vslot">
          <video
            src={HERO_VIDEO || undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Mirage Studios showreel"
            onLoadedData={() => setVideoReady(true)}
          />
          {!videoReady && (
            <div className="vph">
              Hero video goes here.
              <br />
              Set HERO_VIDEO in src/data/site.js
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
