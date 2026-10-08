/**
 * Shared Droppo Labs content + tokens. Copy lives in ONE place so the nav,
 * sections and footer never drift apart.
 */
import type { SocialIconName } from "./icons";

export type ProjectSlug = "seidar" | "releeve";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavSection {
  eyebrow: string;
  links: NavLink[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    eyebrow: "Lab",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Projects", href: "#products" },
      { label: "Contact", href: "#cta" },
    ],
  },
  {
    eyebrow: "Team",
    links: [
      { label: "Members", href: "#team" },
      { label: "FAQ", href: "#faq" },
      { label: "Join", href: "#cta" },
    ],
  },
  {
    eyebrow: "Connect",
    links: [
      { label: "X (Twitter)", href: "https://x.com/droppolabs" },
      { label: "Discord", href: "https://discord.gg/hRuc4W4jD" },
    ],
  },
];

export interface Social {
  name: string;
  href: string;
  icon: SocialIconName;
}

export const SOCIALS: Social[] = [
  { name: "X (Twitter)", href: "https://x.com/droppolabs", icon: "x" },
  { name: "Discord", href: "https://discord.gg/hRuc4W4jD", icon: "discord" },
  { name: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
];

export interface Project {
  slug: ProjectSlug;
  name: string;
  tagline: string;
  tags: string[];
  description: string;
  status: "active" | "in-development";
  statusLabel: string;
  ctaLabel: string;
  /** letter shown on the card face */
  mark: string;
  href: string;
  external?: boolean;
  /** landing visual under /public */
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "seidar",
    name: "Seidar",
    tagline: "DeFi automation for Stellar.",
    tags: ["DeFi", "Automation", "Stellar"],
    description:
      "Seidar brings DeFi protocols, strategies, and automation together in one platform — giving users a simpler way to manage positions and execute on-chain strategies across Stellar.",
    status: "active",
    statusLabel: "Active project",
    ctaLabel: "Explore Seidar",
    mark: "S",
    href: "#products",
    image: "/products/seidar-hero.webp",
  },
  {
    slug: "releeve",
    name: "Releeve",
    tagline: "Simulation and observability for Stellar developers.",
    tags: ["DevTools", "Soroban", "Testing"],
    description:
      "Releeve gives protocols and developers the infrastructure to simulate transactions, reproduce network state, and debug execution — so teams can see exactly what happens before and after changes reach the network.",
    status: "in-development",
    statusLabel: "In progress",
    ctaLabel: "Explore Releeve",
    mark: "R",
    href: "https://releeve.xyz/",
    external: true,
    image: "/products/releeve-hero.webp",
  },
];

export interface MemberLink {
  label: string;
  href: string;
  icon: SocialIconName;
  /** original brand color */
  color: string;
}

export interface Member {
  name: string;
  role: string;
  /** path under /public */
  img: string;
  /** focal point for the cover crop (faces sit right of center) */
  pos: string;
  links: MemberLink[];
}

export const TEAM: Member[] = [
  {
    name: "Justice Uzoigwe",
    role: "Blockchain Researcher & Founder",
    img: "/team/member-beanie.webp",
    pos: "50% 20%",
    links: [
      { label: "X", href: "https://x.com/justvaniti", icon: "x", color: "#ffffff" },
      { label: "Telegram", href: "https://t.me/justice1uv1", icon: "telegram", color: "#229ED9" },
    ],
  },
  {
    name: "Kingsley Agu",
    role: "Fullstack & SC Engineer · Co-Founder",
    img: "/team/member-curly.webp",
    pos: "50% 20%",
    links: [
      { label: "X", href: "https://x.com/kings_0x", icon: "x", color: "#ffffff" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/kingsley-agu-945ab43b9/", icon: "linkedin", color: "#0A66C2" },
      { label: "GitHub", href: "https://github.com/kings0x", icon: "github", color: "#ffffff" },
      { label: "Telegram", href: "https://t.me/kingzX15", icon: "telegram", color: "#229ED9" },
    ],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export interface PublicPost {
  title: string;
  body: string;
  meta: string;
}

export const PUBLIC_POSTS: PublicPost[] = [
  {
    title: "Automation loop #12 shipped",
    body: "Rebalanced strategy execution on Stellar testnet — 40% fewer round-trips, same guarantees.",
    meta: "2d ago · X",
  },
  {
    title: "Replay any transaction",
    body: "Fork network state locally, step through Soroban execution, and see exactly what changed.",
    meta: "5d ago · GitHub",
  },
  {
    title: "Why simulation first?",
    body: "What we learned breaking our own strategies before mainnet ever saw them.",
    meta: "1w ago · X",
  },
  {
    title: "Soroban traces, readable",
    body: "Turning raw diagnostic events into a timeline a human can actually debug.",
    meta: "2w ago · GitHub",
  },
  {
    title: "Positions in one view",
    body: "Protocols, strategies and automation together — no more tab-hopping to manage DeFi.",
    meta: "3w ago · X",
  },
  {
    title: "Build in the open",
    body: "Every experiment ships with notes: what worked, what broke, what we cut.",
    meta: "1mo ago · Discord",
  },
];

export const FAQS: Faq[] = [
  {
    q: "What is Droppo Labs?",
    a: "Droppo is an independent blockchain studio. We explore problems across DeFi, developer infrastructure, automation and decentralized applications — then design, build and ship products that turn on-chain potential into real-world utility.",
  },
  {
    q: "What are you building right now?",
    a: "Seidar (DeFi automation for Stellar) is our active project. Releeve (simulation and observability tooling for developers) is in development. The products section above always reflects the current state of the lab.",
  },
  {
    q: "Do you work with external teams?",
    a: "Yes. We collaborate with protocols and teams on research, tooling and product experiments. Reach out through the contact section and tell us what you're trying to build.",
  },
  {
    q: "How can I follow the work?",
    a: "We build in public — product updates, technical experiments and things we learn along the way are shared on our socials. Links are in the footer and the menu.",
  },
  {
    q: "Are your projects open source?",
    a: "Most of our work is open source, while a few others may remain proprietary.",
  },
];

export const SITE = {
  name: "Droppo Labs",
  short: "Droppo",
  email: "hello@droppolabs.space",
  heroBadge: "Exploring what's possible",
  heroTitle: "Building what's next onchain",
  heroSub:
    "Crafting products and infrastructure that turns the potential of blockchain into real-world utility.",
  heroPrimary: { label: "Explore products", href: "#products" },
  heroSecondary: { label: "Contact us", href: "#cta" },
  aboutEyebrow: "Who we are",
  aboutTitle: "We build. We experiment. We ship.",
  aboutBody:
    "Droppo is an independent blockchain studio focused on turning ideas into useful products. We explore problems across DeFi, developer infrastructure, automation and decentralized applications.",
  aboutCards: [
    {
      title: "Curiosity",
      body: "We stay interested in the questions that haven't been answered yet.",
    },
    {
      title: "Craft",
      body: "We care about the details, from the first idea to the final implementation.",
    },
    {
      title: "Impact",
      body: "We build a purpose, focusig on things that are genuinely useful beyond the technology itself.",
    },
  ],
  productsEyebrow: "Our work",
  productsTitle: "Ideas we're turning into products",
  productsSub:
    "Discover the products and infrastructure we're creating to push blockchain technology forward.",
  teamEyebrow: "The lab",
  teamTitle: "The team behind the lab",
  teamSub:
    "We bring together different perspectives, skills and experiences to turn ideas into reality.",
  publicEyebrow: "In the open",
  publicTitle: "Building in public",
  publicSub:
    "Follow along as we build, contribute and experiment on decentralized systems. From product updates to technical experiments and things we learn along the way.",
  faqTitle: "Frequently asked questions",
  ctaTitle: "We're just getting started.",
  ctaSub:
    "There is a lot more ahead. Follow along and see where the work takes us.",
  ctaPrimary: { label: "Get in touch", href: "#cta" },
  rights: "© 2026 Droppo Labs — All rights reserved.",
};
