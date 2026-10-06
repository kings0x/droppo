import { useState } from "react";
import { FAQS, SITE } from "./content";
import { useRevealRoot } from "./hooks";
import { TealWaves } from "./Hero";
import { DiscordIcon, MailIcon, XIcon } from "./icons";

const CTA_SOCIALS = [
  { label: "X (Twitter)", href: "https://x.com/droppolabs", Icon: XIcon, tilt: "rotate-3" },
  { label: "Discord", href: "https://discord.gg/hRuc4W4jD", Icon: DiscordIcon, tilt: "-rotate-3" },
  { label: "Email", href: `mailto:${SITE.email}`, Icon: MailIcon, tilt: "rotate-6" },
];

export default function FaqCta() {
  const faqRef = useRevealRoot<HTMLDivElement>();
  const ctaRef = useRevealRoot<HTMLDivElement>();
  // single-open accordion; the first item starts open
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* ---------- FAQ ---------- */}
      <section id="faq" className="relative bg-ash-800 py-20 sm:py-24 lg:py-28">
        <div className="grain" aria-hidden="true" />
        <div ref={faqRef} className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="reveal text-center text-xl font-normal text-white sm:text-2xl md:text-3xl">
            {SITE.faqTitle}
          </h2>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => {
              const on = open === i;
              return (
                <div
                  key={f.q}
                  className={`reveal rounded-[0.625rem] border transition-all duration-300 ${
                    on
                      ? "border-transparent bg-[#14b3a2]"
                      : "border-white/20 bg-transparent"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-[15px] font-medium text-white">{f.q}</span>
                    <span
                      aria-hidden="true"
                      className="relative flex h-8 w-8 flex-none items-center justify-center rounded-full border border-white/20"
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-[2px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ${
                          on ? "rotate-45" : ""
                        }`}
                      />
                      <span
                        className={`absolute left-1/2 top-1/2 h-[2px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ${
                          on ? "-rotate-45" : "rotate-90"
                        }`}
                      />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)]"
                    style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-5 text-sm leading-relaxed transition-all delay-75 duration-300 ${
                          on ? "pb-5 text-white/85 opacity-100" : "pb-0 text-white/70 opacity-0"
                        }`}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- FINAL CTA ---------- */}
      <section id="cta" className="relative overflow-hidden bg-ash-900 py-20 sm:py-24 lg:py-28">
        <TealWaves idSuffix="-cta" className="cta-waves" />
        <div className="grain" aria-hidden="true" />
        <div ref={ctaRef} className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="reveal mx-auto max-w-2xl text-2xl font-normal leading-[1.1] text-white sm:text-3xl md:text-4xl">
            {SITE.ctaTitle}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            {SITE.ctaSub}
          </p>
          <div className="reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={SITE.ctaPrimary.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[15px] font-medium text-black transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {SITE.ctaPrimary.label}
            </a>
          </div>
          <div className="reveal mt-8 flex items-center justify-center gap-3 sm:gap-4">
            {CTA_SOCIALS.map(({ label, href, Icon, tilt }) => (
              <a
                key={label}
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
                title={label}
                className={`flex h-14 w-14 items-center justify-center rounded-[22%] border-2 border-white/80 text-white transition-all duration-300 hover:rotate-0 hover:bg-white/10 sm:h-16 sm:w-16 ${tilt}`}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
