import { useState } from "react";
import { PUBLIC_POSTS, SITE, TEAM } from "./content";
import { useRevealRoot } from "./hooks";
import { FLOW_SHEEN, FlowSvg } from "./flows";
import {
  LikeIcon,
  ReplyIcon,
  RepostIcon,
  SOCIAL_ICONS,
  VerifiedIcon,
  ViewsIcon,
} from "./icons";

/**
 * Build tile widget — a launch checklist you can actually tick off:
 * design, prototype, harden. Progress fills as steps complete.
 */
const BUILD_STEPS = ["Design", "Prototype", "Harden"];

function ChecklistWidget() {
  const [done, setDone] = useState([true, true, false]);
  const count = done.filter(Boolean).length;
  return (
    <div className="w-[200px] rounded-xl bg-white p-4 text-left shadow-2xl md:w-[210px] lg:w-[230px]">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-gray-900">Ready to ship</p>
        <p className="font-mono text-[11px] font-medium text-gray-400">
          {count}/{BUILD_STEPS.length}
        </p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-flow-hi to-flow-deep transition-all duration-500"
          style={{ width: `${(count / BUILD_STEPS.length) * 100}%` }}
        />
      </div>
      <div className="mt-3 space-y-2">
        {BUILD_STEPS.map((s, k) => {
          const on = done[k];
          return (
            <button
              key={s}
              type="button"
              onClick={() => setDone((d) => d.map((v, j) => (j === k ? !v : v)))}
              aria-pressed={on}
              className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1 text-left transition-colors hover:bg-gray-50"
            >
              <span
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 transition-colors ${
                  on ? "border-black bg-black text-white" : "border-gray-300 bg-white text-transparent"
                }`}
              >
                <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6.5l2.5 2.5 4.5-5" />
                </svg>
              </span>
              <span className={`text-[13px] font-medium ${on ? "text-gray-400 line-through" : "text-gray-900"}`}>
                {s}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Experiment tile widget — small bets: back variant A or B and watch the
 * honest results pile up live.
 */
function BetWidget() {
  const [votes, setVotes] = useState([14, 9]);
  const total = votes[0] + votes[1] || 1;
  return (
    <div className="w-[200px] rounded-xl bg-white p-4 text-left shadow-2xl md:w-[210px] lg:w-[230px]">
      <p className="text-[13px] font-semibold text-gray-900">Small bets</p>
      <p className="mt-0.5 text-[11px] font-normal text-gray-400">Pick a winner · {total} bets in</p>
      <div className="mt-3 space-y-2.5">
        {(["Variant A", "Variant B"] as const).map((label, k) => {
          const pct = Math.round((votes[k] / total) * 100);
          return (
            <button
              key={label}
              type="button"
              onClick={() => setVotes((v) => v.map((n, j) => (j === k ? n + 1 : n)))}
              className="group block w-full text-left"
            >
              <span className="flex items-center justify-between text-[12px] font-medium text-gray-900">
                {label}
                <span className="font-mono text-[11px] text-gray-400">{pct}%</span>
              </span>
              <span className="mt-1 block h-2 overflow-hidden rounded-full bg-gray-100">
                <span
                  className={`block h-full rounded-full transition-all duration-500 ${
                    k === 0 ? "bg-gradient-to-r from-flow-hi to-flow-deep" : "bg-gray-900"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 border-t border-gray-100 pt-2 text-center text-xs font-medium text-gray-900">
        Results update live
      </p>
    </div>
  );
}

/**
 * Ship tile widget — release stepper: every press ships the next version
 * until the line reads Live.
 */
const RELEASES = [
  { v: "v0.9", note: "First public cut" },
  { v: "v1.0", note: "Stable API" },
  { v: "v1.1", note: "Faster loops" },
  { v: "v1.2", note: "Live for everyone" },
];

function ShipWidget() {
  const [at, setAt] = useState(1);
  const live = at >= RELEASES.length - 1;
  return (
    <div className="w-[200px] rounded-xl bg-white p-4 text-left shadow-2xl md:w-[210px] lg:w-[230px]">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-400">Release</p>
      <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{RELEASES[at].v}</p>
      <p className="mt-0.5 min-h-[2em] text-[12px] font-normal text-gray-500">{RELEASES[at].note}</p>
      <div className="mt-2 flex items-center gap-1.5">
        {RELEASES.map((r, k) => (
          <span
            key={r.v}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              k <= at ? "bg-gray-900" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        disabled={live}
        onClick={() => setAt((a) => Math.min(a + 1, RELEASES.length - 1))}
        className="mt-3 flex min-h-[40px] w-full items-center justify-center rounded-full bg-black text-[13px] font-medium text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-default disabled:bg-[#00ba7c]"
      >
        {live ? "Live ✓" : "Ship it →"}
      </button>
    </div>
  );
}

const TILE_WIDGETS = [BetWidget, ChecklistWidget, ShipWidget];
function AboutCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const Widget = TILE_WIDGETS[index % TILE_WIDGETS.length];
  const tile = (
    <div className="relative flex h-[300px] w-full flex-col overflow-hidden rounded-lg border-2 border-white/20 bg-white/[0.03] p-5 backdrop-blur-sm md:h-[340px] md:rounded-xl md:p-6 lg:h-[380px] lg:p-8 max-[414px]:h-[260px] max-[414px]:p-3">
      {/* corner-pair sheens, cropped by the tile and faded toward its middle */}
      <div
        className="absolute bottom-0 left-0 z-0"
        aria-hidden="true"
        style={{ maskImage: "radial-gradient(115% 115% at 0% 100%, black 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(115% 115% at 0% 100%, black 55%, transparent 100%)" }}
      >
        <FlowSvg
          flow={FLOW_SHEEN}
          className="h-[200px] w-[280px] opacity-90 md:h-[240px] md:w-[360px] lg:h-[300px] lg:w-[440px] max-[414px]:h-[160px] max-[414px]:w-[220px]"
          idSuffix={`-about-${index}-l`}
        />
      </div>
      <div
        className="absolute right-0 top-0 z-0 translate-x-1/4"
        aria-hidden="true"
        style={{ maskImage: "radial-gradient(115% 115% at 100% 0%, black 55%, transparent 100%)", WebkitMaskImage: "radial-gradient(115% 115% at 100% 0%, black 55%, transparent 100%)" }}
      >
        <FlowSvg
          flow={FLOW_SHEEN}
          className="h-[200px] w-[280px] -scale-x-100 opacity-90 md:h-[240px] md:w-[360px] lg:h-[300px] lg:w-[440px] max-[414px]:h-[160px] max-[414px]:w-[220px]"
          idSuffix={`-about-${index}-r`}
        />
      </div>
      <div className="relative z-10 flex flex-1 items-center justify-center p-4 md:p-5">
        <Widget />
      </div>
    </div>
  );

  return (
    <div className="reveal mx-auto flex h-full w-full max-w-[340px] flex-col max-md:max-w-[280px] max-[389px]:max-w-[240px]">
      {tile}
      <h3 className="mb-1 mt-2.5 text-left text-base font-semibold text-white md:mb-1.5 md:mt-3 md:text-lg max-[414px]:mb-1 max-[414px]:mt-2 max-[414px]:text-sm">
        {title}
      </h3>
      <p className="text-left text-xs leading-relaxed text-white/75 md:text-sm max-[414px]:text-[11px]">
        {body}
      </p>
    </div>
  );
}

export function AboutSection() {
  const aboutRef = useRevealRoot<HTMLDivElement>();

  return (
      <section id="about" className="relative bg-ash-900 py-20 sm:py-24 lg:py-28">
        <div className="grain" aria-hidden="true" />
        <div ref={aboutRef} className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="reveal font-mono text-xs uppercase tracking-[0.1em] text-ash-200">
            {SITE.aboutEyebrow}
          </p>
          <h2 className="reveal mx-auto mt-3 max-w-2xl text-xl font-normal leading-[1.1] text-white sm:text-2xl md:text-3xl">
            {SITE.aboutTitle}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {SITE.aboutBody}
          </p>
          <div className="mt-10 grid grid-cols-1 items-start gap-5 md:grid-cols-3 md:gap-6 lg:gap-10">
            {SITE.aboutCards.map((c, i) => (
              <AboutCard
                key={c.title}
                title={c.title}
                body={c.body}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
  );
}

export function TeamSection() {
  const teamRef = useRevealRoot<HTMLDivElement>();

  return (
      <section id="team" className="relative bg-ash-800 py-20 sm:py-24 lg:py-28">
        <div className="grain" aria-hidden="true" />
        <div ref={teamRef} className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="reveal font-mono text-xs uppercase tracking-[0.1em] text-ash-200">
            {SITE.teamEyebrow}
          </p>
          <h2 className="reveal mt-3 text-xl font-normal text-white sm:text-2xl md:text-3xl">
            {SITE.teamTitle}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {SITE.teamSub}
          </p>
          <div className="mx-auto mt-10 grid max-w-5xl gap-10 text-left sm:grid-cols-2 sm:gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="reveal">
                <img
                  src={m.img}
                  alt={m.name}
                  className="mx-auto w-full object-cover"
                  style={{
                    objectPosition: m.pos,
                    maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
                  }}
                  loading="lazy"
                />
                <div className="relative z-10 mt-0 sm:-mt-8">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <h3 className="text-base font-bold text-white sm:text-xl">{m.name}</h3>
                    <VerifiedIcon className="h-4 w-4 flex-none sm:h-5 sm:w-5" />
                  </div>
                <p className="mt-1 text-center text-xs text-white/60 sm:text-left sm:text-sm">{m.role}</p>
                <div className="mt-2 flex items-center justify-center gap-2.5 sm:mt-3 sm:justify-start sm:gap-3">
                  {m.links.map((l) => {
                    const Icon = SOCIAL_ICONS[l.icon];
                    return (
                      <a
                        key={l.label}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} on ${l.label}`}
                        title={l.label}
                        style={{ color: l.color }}
                        className="transition-opacity duration-200 hover:opacity-70"
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
  );
}

export function PublicSection() {
  const publicRef = useRevealRoot<HTMLDivElement>();

  return (
      <section id="public" className="relative overflow-hidden bg-ash-900 py-20 sm:py-24 lg:py-28">
        <div className="grain" aria-hidden="true" />
        <div ref={publicRef} className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="reveal font-mono text-xs uppercase tracking-[0.1em] text-ash-200">
            {SITE.publicEyebrow}
          </p>
          <h2 className="reveal mx-auto mt-3 max-w-2xl text-xl font-normal leading-[1.1] text-white sm:text-2xl md:text-3xl">
            {SITE.publicTitle}
          </h2>
          <p className="reveal mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {SITE.publicSub}
          </p>
        </div>
        {/* marquee — ambient loop, pause on hover (§5B) */}
        <div className="group relative z-10 mt-10 overflow-hidden" aria-label="Latest updates">
          <div className="marquee-track animate-marquee flex w-max gap-0 py-8 will-change-transform group-hover:[animation-play-state:paused]">
            {[0, 1].map((half) => (
              <div key={half} className="flex gap-4 pr-4" aria-hidden={half === 1}>
                {PUBLIC_POSTS.map((p, i) => {
              const replies = 8 + (i % PUBLIC_POSTS.length) * 5;
              const reposts = 21 + (i % PUBLIC_POSTS.length) * 11;
              const likes = 96 + (i % PUBLIC_POSTS.length) * 47;
              const views = `${(1.2 + (i % PUBLIC_POSTS.length) * 0.8).toFixed(1)}K`;
              const actions = [
                { Icon: ReplyIcon, n: `${replies}`, hover: "hover:text-[#1d9bf0]", label: "Replies" },
                { Icon: RepostIcon, n: `${reposts}`, hover: "hover:text-[#00ba7c]", label: "Reposts" },
                { Icon: LikeIcon, n: `${likes}`, hover: "hover:text-[#f91880]", label: "Likes" },
                { Icon: ViewsIcon, n: views, hover: "hover:text-[#1d9bf0]", label: "Views" },
              ];
              return (
                <article
                  key={`${p.title}-${i}`}
                  style={{ animationDelay: `${-(i % PUBLIC_POSTS.length) * 1}s` }}
                  className="marquee-card animate-wave-bob h-[195px] w-[300px] flex-none transform-gpu overflow-hidden rounded-2xl border border-[#2f3336] bg-black p-4 text-left transition-all duration-300 hover:z-50 hover:bg-white/[0.03] hover:shadow-2xl sm:h-[200px] sm:w-[340px] lg:h-[210px] lg:w-[380px]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white"
                      aria-hidden="true"
                    >
                      <img
                        src="/logo/droppo-logo.webp"
                        alt=""
                        className="h-7 w-7 object-contain"
                        loading="lazy"
                      />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <p className="truncate text-[15px] font-bold text-white">Droppo Labs</p>
                      <p className="truncate text-sm font-normal text-[#71767b]">@droppolabs</p>
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-3 text-[15px] font-normal leading-normal text-[#e7e9ea]">
                    <span className="font-bold">{p.title}.</span> {p.body}
                  </p>
                  <div className="mt-2 flex max-w-[300px] items-center justify-between text-[#71767b]">
                    {actions.map(({ Icon, n, hover, label }) => (
                      <span
                        key={label}
                        title={`${n} ${label}`}
                        className={`flex items-center gap-1 text-xs transition-colors duration-200 ${hover}`}
                      >
                        <Icon />
                        <span>{n}</span>
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}

export default function Sections() {
  return (
    <>
      <AboutSection />
      <TeamSection />
      <PublicSection />
    </>
  );
}
