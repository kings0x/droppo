import { SITE } from "./content";
import { useRevealRoot } from "./hooks";

const LAB_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Projects", href: "#products" },
  { label: "Contact", href: "#cta" },
  { label: "Members", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Join", href: "#cta" },
];

const COMMUNITY_LINKS = [
  { label: "Twitter", href: "https://x.com/" },
  { label: "Mail", href: `mailto:${SITE.email}` },
  { label: "Discord", href: "https://discord.gg/hRuc4W4jD" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
];

const PROJECT_LINKS = [
  { label: "Seidar", href: "#products" },
  { label: "Releeve", href: "https://releeve.xyz/", external: true },
];

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-white sm:text-sm">
      {children}
    </h3>
  );
}

const linkCls =
  "text-[13px] text-white/60 transition-colors hover:text-white sm:text-[15px]";

/**
 * Footer — brand blurb left, link rails grouped at the right end with their
 * lists bottom-aligned, and a giant cropped DROPPO wordmark anchoring
 * the bottom-left.
 */
export default function Footer() {
  const ref = useRevealRoot<HTMLDivElement>();

  return (
    <footer className="relative overflow-hidden border-t border-ash-600 bg-ash-900 pt-16">
      <div className="grain" aria-hidden="true" />
      <div ref={ref} className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:justify-between">
          <div className="reveal max-w-xs">
            <div className="flex items-center gap-2">
              <img
                src="/logo/droppo-logo.webp"
                alt=""
                aria-hidden="true"
                className="h-7 w-7 object-contain"
                loading="lazy"
              />
              <span className="text-lg font-semibold tracking-[-0.01em] text-white">
                {SITE.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {SITE.heroSub}
            </p>
          </div>

          <div className="flex flex-wrap items-stretch gap-10 sm:gap-14 lg:gap-20">
            <nav className="reveal order-3 flex flex-col md:order-1" aria-label="Footer — Lab">
              <ColHead>Lab</ColHead>
              <ul className="mt-4 space-y-2.5">
                {LAB_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={linkCls}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="reveal order-2 flex flex-col md:order-2" aria-label="Footer — Community">
              <ColHead>Community</ColHead>
              <ul className="mt-4 space-y-2.5">
                {COMMUNITY_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={linkCls}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="reveal order-1 flex flex-col md:order-3" aria-label="Footer — Projects">
              <ColHead>Projects</ColHead>
              <ul className="mt-4 space-y-2.5">
                {PROJECT_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={linkCls}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-end gap-1 py-6 text-right">
          <p className="text-xs text-white/50">© 2026 Droppo Labs</p>
        </div>
      </div>

      <div
        className="footer-giant pointer-events-none absolute bottom-[-0.18em] left-0 z-0 select-none"
        aria-hidden="true"
      >
        DROPPO
      </div>
    </footer>
  );
}
