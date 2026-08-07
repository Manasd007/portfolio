/**
 * Work experience. Sourced verbatim from Manas's résumé. Metrics are quoted, not invented.
 */

/** A headline number worth counting up. Every value is quoted from `points`. */
export type Metric = {
  value: number; // count-up target
  from?: number; // count-up start (default 0)
  prefix?: string;
  suffix?: string;
  label: string;
  sub?: string; // small supporting caption
  accent?: boolean; // color the number to flag the standout growth stat
};

/** A punchy lead + a plain-English explanation. Not résumé prose. */
export type ExperiencePoint = { lead: string; body: string };

export type Experience = {
  company: string;
  focus: string; // parenthetical context on the résumé
  role: string;
  location: string;
  period: string;
  current?: boolean;
  metrics: Metric[];
  points: ExperiencePoint[];
};

export const experience: Experience[] = [
  {
    company: "NeoFab.AI",
    focus: "AI Factory Planning",
    role: "Software Engineer Intern (Full-Stack + AI)",
    location: "Seattle, WA",
    period: "Since Aug 2025",
    current: true,
    metrics: [
      { value: 17, from: 1, prefix: "~", suffix: "×", label: "Dataset growth", sub: "54 → 962 records", accent: true },
      { value: 908, label: "Machine records", sub: "in the RAG knowledge base" },
      { value: 4, label: "Manufacturing sectors" },
      { value: 3, label: "Enterprise evaluators", sub: "OLA · Ather · Siemens" },
    ],
    points: [
      {
        lead: "Solved the cold-start data problem",
        body: "The product barely had a dataset to stand on, so I built a Python crawler that pulls manufacturer pages into Firestore and untangles the messy HTML with regex. It turned a near-empty table into a dataset the rest of the app could actually be built on.",
      },
      {
        lead: "Built the site they pitch investors with",
        body: "Shipped the marketing site in Next.js with a live Three.js factory running on it, which the team now uses as their investor deck. Behind the login I built the config editors for workflows, process flows, and the sidebar on FastAPI, gated by role-based access.",
      },
      {
        lead: "Automated the whole RFQ loop",
        body: "Designed a procurement agent that turns a requirement into RFQ emails, sends them to scraped vendor contacts, and threads the replies into an inbox inside the dashboard, so the entire sourcing back-and-forth stays in one place.",
      },
      {
        lead: "Put it in front of enterprise buyers",
        body: "Grew the RAG knowledge base across four manufacturing domains and shipped it into the live Industrial AI product that OLA, Ather, and Siemens have evaluated.",
      },
    ],
  },
];
