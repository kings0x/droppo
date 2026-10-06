import { useEffect, useState } from "react";
import { NAV_SECTIONS, SITE, SOCIALS } from "./content";
import { SOCIAL_ICONS } from "./icons";

/**
 * Two-step navbar — rebuilt from a deep study of the reference interaction:
 * one eased token (cubic-bezier(.625,.05,0,1)) drives a SEQUENCED open —
 * bar snaps wide first, halo blooms, hairline fades in, panel unfolds on
 * grid-rows, links cascade with stagger. Hover spreads the hamburger bars;
 * the slanted language button sweeps white while its label rolls over.
 * Single attribute `data-nav-status` drives all CSS.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // the page behind the menu keeps scrolling — no scroll lock
  const status = open ? "active" : "not-active";

  return (
    <nav
      data-twostep-nav
      data-nav-status={status}
      className="twostep-nav"
      aria-label="Main"
    >
      <div
        className="twostep-nav__bg"
        data-nav-toggle="close"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="twostep-nav__wrap">
        <div className="twostep-nav__width">
          <div className="twostep-nav__bar">
            <div className="twostep-nav__back" aria-hidden="true">
              <div className="twostep-nav__back-bg" />
            </div>

            <div className="twostep-nav__top">
              <a href="#hero" className="twostep-nav__logo" aria-label={`${SITE.name} home`}>
                <img
                  src="/logo/droppo-logo.webp"
                  alt=""
                  aria-hidden="true"
                  className="twostep-nav__logo-img"
                  loading="eager"
                />
                <span className="twostep-nav__logo-word">{SITE.short}</span>
              </a>

              <div className="twostep-nav__actions">
                <a href="#products" className="twostep-nav__pill twostep-nav__discover">
                  Discover
                </a>
                <button
                  className="twostep-nav__toggle"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="twostep-nav__toggle-bars" aria-hidden="true">
                    <span className="twostep-nav__toggle-bar" />
                    <span className="twostep-nav__toggle-bar" />
                  </span>
                  <span className="twostep-nav__menu-text">Menu</span>
                </button>
              </div>
            </div>
            <div className="twostep-nav__top-line" aria-hidden="true" />

            <div className="twostep-nav__bottom">
              <div className="twostep-nav__bottom-overflow">
                <div className="twostep-nav__bottom-inner">
                  <div className="twostep-nav__bottom-row">
                    {NAV_SECTIONS.map((s) => (
                      <div
                        className={`twostep-nav__bottom-col${s.eyebrow === "Connect" ? " twostep-nav__bottom-col--connect" : ""}`}
                        key={s.eyebrow}
                      >
                        <div className="twostep-nav__section">
                          <h3 className="twostep-nav__section-title">{s.eyebrow}</h3>
                          <ul className="twostep-nav__ul">
                            {s.links.map((l) => (
                              <li className="twostep-nav__li" key={l.label}>
                                <a
                                  className="twostep-nav__link"
                                  href={l.href}
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="twostep-nav__link-span">{l.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                    <div className="twostep-nav__bottom-col twostep-nav__bottom-visual" aria-hidden="true">
                      <div className="twostep-nav__visual-card">
                        <img
                          src="/logo/droppo-logo.webp"
                          alt=""
                          className="twostep-nav__visual-img"
                          loading="lazy"
                        />
                        <span className="twostep-nav__visual-word">{SITE.short}</span>
                      </div>
                    </div>
                  </div>
                  <div className="twostep-nav__social-row">
                    {SOCIALS.map((s) => {
                      const Icon = SOCIAL_ICONS[s.icon];
                      return (
                        <a
                          key={s.name}
                          className="twostep-nav__social-icon"
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          title={s.name}
                        >
                          <Icon />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
