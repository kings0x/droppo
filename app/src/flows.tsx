/**
 * Tile sheen + SVG renderer for the about-card corner accents.
 * (Older flow silhouettes were removed with the sections that used them.)
 */

interface FlowDef {
  id: string;
  viewBox: string;
  path: string;
  gradient: { x1: string; y1: string; x2: string; y2: string };
  stops: { offset: string; color: string; opacity?: number }[];
}

/** White sheen — card tiles. A translucent white gradient dissolving to
 *  transparent (never a solid fill): soft light streaks over dark or blue
 *  tile fields. */
export const FLOW_SHEEN: FlowDef = {
  id: "droppo-flow-sheen",
  viewBox: "0 0 700 600",
  path:
    "M-40 -60 C180 -20 420 60 480 220 C530 356 360 430 420 540 " +
    "C470 630 640 660 780 620 L820 700 L-40 700 Z",
  gradient: { x1: "0", y1: "1", x2: "1", y2: "0" },
  stops: [
    { offset: "0", color: "#ffffff", opacity: 0.28 },
    { offset: "0.55", color: "#ffffff", opacity: 0.22 },
    { offset: "1", color: "#ffffff", opacity: 0 },
  ],
};

export function FlowSvg({
  flow,
  className = "",
  rim = false,
  idSuffix = "",
}: {
  flow: FlowDef;
  className?: string;
  /** pale blurred rim along the leading edge (hero only) */
  rim?: boolean;
  idSuffix?: string;
}) {
  const gid = `${flow.id}${idSuffix}`;
  const rid = `${flow.id}-rim${idSuffix}`;
  return (
    <svg
      viewBox={flow.viewBox}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient
          id={gid}
          x1={flow.gradient.x1}
          y1={flow.gradient.y1}
          x2={flow.gradient.x2}
          y2={flow.gradient.y2}
        >
          {flow.stops.map((s) => (
            <stop
              key={s.offset}
              offset={s.offset}
              stopColor={s.color}
              stopOpacity={s.opacity ?? 1}
            />
          ))}
        </linearGradient>
        {rim && (
          <linearGradient id={rid} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7FD4FF" stopOpacity="0" />
            <stop offset="0.55" stopColor="#7FD4FF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#7FD4FF" stopOpacity="0" />
          </linearGradient>
        )}
        {rim && (
          <filter id={`${gid}-soft`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        )}
      </defs>
      <path d={flow.path} fill={`url(#${gid})`} />
      {rim && (
        <path
          d={flow.path}
          fill="none"
          stroke={`url(#${rid})`}
          strokeWidth="1.5"
          filter={`url(#${gid}-soft)`}
        />
      )}
    </svg>
  );
}
