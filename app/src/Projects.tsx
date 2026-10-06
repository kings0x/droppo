import { useState } from "react";
import { PROJECTS, SITE, type Project } from "./content";
import { useRevealRoot } from "./hooks";

function Cta({ p, tabIndex }: { p: Project; tabIndex?: number }) {
  return (
    <a
      href={p.href}
      {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      tabIndex={tabIndex}
      className="inline-flex min-h-[44px] items-center rounded-full bg-white px-6 py-2 text-xs font-medium text-black transition-all hover:bg-white active:scale-[0.98]"
    >
      {p.ctaLabel} →
    </a>
  );
}

/** Wide desktop card — same ash glass as the who-we-are tiles, never blue. */
function WideCard({ p }: { p: Project }) {
  const shortStatus = p.status === "active" ? "Active" : p.statusLabel;
  return (
    <article className="reveal flex flex-col overflow-hidden rounded-2xl border-2 border-white/20 bg-white/[0.03] text-left backdrop-blur-sm transition-colors duration-300 hover:border-white/30">
      {p.image ? (
        <img
          src={p.image}
          alt={`${p.name} landing page`}
          className="aspect-[1200/630] w-full object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-[1200/630] w-full items-center justify-center bg-black/40">
          <span className="text-7xl font-normal text-white/90" aria-hidden="true">
            {p.mark}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-center gap-3">
          {p.slug === "releeve" ? (
            <svg viewBox="0 0 32 32" className="h-7 w-7 flex-none" aria-hidden="true">
              <rect x="2" y="2" width="28" height="28" rx="7" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.5" />
              <text x="16" y="16" dy=".35em" textAnchor="middle" fontSize="15" fontWeight="500" fill="#fff" fontFamily="inherit">
                R
              </text>
            </svg>
          ) : (
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-black"
              style={{ background: "#fff" }}
              aria-hidden="true"
            >
              {p.mark}
            </span>
          )}
          <h3 className="text-2xl font-normal tracking-[-0.015em] text-white">{p.name}</h3>
          <span
            className={`ml-auto inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-medium ${
              p.status === "active"
                ? "border-green-400/30 bg-green-400/10 text-green-300"
                : "border-orange-400/30 bg-orange-400/10 text-orange-300"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {shortStatus}
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-ice">{p.tagline}</p>
        <p className="mt-3 max-w-[52ch] text-sm font-normal leading-relaxed text-white/70">
          {p.description}
        </p>
        <div className="mt-auto flex items-center justify-end pt-6">
          <Cta p={p} />
        </div>
      </div>
    </article>
  );
}

/** Product showcase.
 *  Mobile: tabbed single card (unchanged). Desktop: two wide dark cards. */
export default function Projects() {
  const ref = useRevealRoot<HTMLDivElement>();
  const [active, setActive] = useState(PROJECTS[0].slug);

  return (
    <section id="products" className="relative overflow-hidden bg-ash-900 py-20 sm:py-24 lg:py-28">
      <div className="grain" aria-hidden="true" />
      <div ref={ref} className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="reveal font-mono text-xs uppercase tracking-[0.1em] text-ash-200">
          {SITE.productsEyebrow}
        </p>
        <h2 className="reveal mt-3 text-xl font-normal text-white sm:text-2xl md:text-3xl">
          {SITE.productsTitle}
        </h2>
        <p className="reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          {SITE.productsSub}
        </p>

        {/* mobile tabs */}
        <div className="reveal mt-8 flex flex-wrap justify-center gap-3 md:hidden" role="tablist" aria-label="Products">
          {PROJECTS.map((p) => {
            const on = p.slug === active;
            return (
              <button
                key={p.slug}
                role="tab"
                aria-selected={on}
                aria-pressed={on}
                aria-label={`Switch to ${p.name}`}
                onClick={() => setActive(p.slug)}
                className={`btn-slanted btn-slanted-product px-5 py-2 text-sm font-medium max-md:px-4 max-md:py-1.5 max-md:text-xs max-[389px]:px-3 max-[389px]:py-1 max-[389px]:text-[11px] ${
                  on ? "btn-slanted-product--active" : "btn-slanted-product--inactive"
                }`}
              >
                <span className="btn-slanted-label__wrap">
                  <span className="btn-slanted-label btn-slanted-label--current">{p.name}</span>
                  <span aria-hidden="true" className="btn-slanted-label btn-slanted-label--opposite">
                    {p.name}
                  </span>
                </span>
                <span className="btn-slanted-bg" aria-hidden="true" />
              </button>
            );
          })}
        </div>

        {/* mobile single card */}
        <div className="relative mt-10 min-h-[560px] sm:min-h-[520px] md:hidden">
          {PROJECTS.map((p) => {
            const on = p.slug === active;
            return (
              <article
                key={p.slug}
                aria-hidden={!on}
                className="absolute inset-0"
                style={{ zIndex: on ? 50 : 10, display: on ? "" : "none" }}
              >
                {/* Mobile tabs reuse the desktop cards — no blue-gradient dummies. */}
                <div className="relative mx-auto w-[400px] max-w-full max-md:w-[17rem]">
                  <WideCard p={p} />
                </div>
              </article>
            );
          })}
        </div>

        {/* desktop wide cards */}
        <div className="mx-auto mt-10 hidden max-w-6xl gap-6 text-left md:grid md:grid-cols-2">
          {PROJECTS.map((p) => (
            <WideCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
