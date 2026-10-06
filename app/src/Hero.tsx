import { SITE } from "./content";
import "./hero.css";

/**
 * Teal wave field transplanted from Downloads/hero.html. Suffix keeps
 * gradient/filter ids unique when rendered more than once per page.
 */
export function TealWaves({ idSuffix = "", className = "waves" }: { idSuffix?: string; className?: string }) {
  const gA = `gA${idSuffix}`;
  const gB = `gB${idSuffix}`;
  const rim = `rim${idSuffix}`;
  const soft = `soft${idSuffix}`;
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gA} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14b3a2" />
          <stop offset=".45" stopColor="#0a6f6e" />
          <stop offset="1" stopColor="#021a22" />
        </linearGradient>
        <linearGradient id={gB} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1fc8b2" />
          <stop offset=".5" stopColor="#0b6b73" />
          <stop offset="1" stopColor="#03232c" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7ff5e0" stopOpacity="0" />
          <stop offset=".55" stopColor="#7ff5e0" stopOpacity=".55" />
          <stop offset="1" stopColor="#7ff5e0" stopOpacity="0" />
        </linearGradient>
        <filter id={soft} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Upper-right sweep — enters from the top */}
      <g className="enter-top">
        <g className="drift-b">
          <path d="M430 -20 C350 210 180 330 -20 380 L-20 -20 Z" fill={`url(#${gB})`} />
          <path
            d="M430 -20 C350 210 180 330 -20 380"
            fill="none"
            stroke={`url(#${rim})`}
            strokeWidth="1.5"
            filter={`url(#${soft})`}
          />
        </g>
      </g>

      {/* Lower ribbon, rising left to right — enters from below */}
      <g className="enter-bottom">
        <g className="drift-a">
          <path
            d="M-40 760 C170 690 330 840 600 770 C900 690 1120 470 1480 520 L1480 940 L-40 940 Z"
            fill={`url(#${gA})`}
          />
          <path
            d="M-40 760 C170 690 330 840 600 770 C900 690 1120 470 1480 520"
            fill="none"
            stroke={`url(#${rim})`}
            strokeWidth="1.5"
            filter={`url(#${soft})`}
          />
          <path
            d="M-40 850 C220 800 420 910 700 860 C980 810 1200 640 1480 660 L1480 940 L-40 940 Z"
            fill="#021218"
            opacity=".55"
          />
        </g>
      </g>
    </svg>
  );
}

/**
 * Hero — verbatim transplant of Downloads/hero.html (teal wave field + grain
 * + copy block). Only the copy text is swapped to Droppo's (via SITE tokens);
 * positions, timings, colours and motion are untouched. The pill nav + sheet
 * from that file are NOT used — the two-step <Navbar/> (App) sits above this.
 */
export default function Hero() {
  return (
    <header id="hero" className="hero-legacy hero">
      {/* Wave field */}
      <TealWaves idSuffix="-hero" />
      <div className="grain" aria-hidden="true" />

      {/* Copy — Droppo text in the file's exact positions */}
      <div className="content">
        <span className="status">
          {SITE.heroBadge}
        </span>
        <h1>{SITE.heroTitle}</h1>
        <p className="sub">{SITE.heroSub}</p>
        <div className="actions">
          <a
            className="btn-slanted btn-slanted-product btn-slanted-product--active"
            href={SITE.heroPrimary.href}
          >
            <span className="btn-slanted-label__wrap">
              <span className="btn-slanted-label btn-slanted-label--current">
                {SITE.heroPrimary.label}
              </span>
              <span aria-hidden="true" className="btn-slanted-label btn-slanted-label--opposite">
                {SITE.heroPrimary.label}
              </span>
            </span>
            <span className="btn-slanted-bg" aria-hidden="true" />
          </a>
          <a
            className="btn-slanted btn-slanted-product btn-slanted-product--inactive"
            href={SITE.heroSecondary.href}
          >
            <span className="btn-slanted-label__wrap">
              <span className="btn-slanted-label btn-slanted-label--current">
                {SITE.heroSecondary.label}
              </span>
              <span aria-hidden="true" className="btn-slanted-label btn-slanted-label--opposite">
                {SITE.heroSecondary.label}
              </span>
            </span>
            <span className="btn-slanted-bg" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}

