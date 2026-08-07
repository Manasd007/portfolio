/**
 * Single source of truth for project content. Sourced from Manas's résumé and the
 * real GitHub repos (see idea.md). Metrics are quoted from the résumé; do not invent.
 */

export type Project = {
  slug: string;
  index: string; // "01".."04"
  name: string;
  tagline: string;
  role: string;
  year: string;
  category: "Infrastructure" | "Applied AI" | "AI Full-Stack" | "Product / SaaS";
  accent: string; // per-project accent for panel theming
  shot?: string; // path to a page screenshot, e.g. "/shots/conduit.png"; placeholder shown if unset
  award?: { amount: string; label: string; from: string }; // funding / recognition, crowned
  summary: string;
  problem: string;
  hardParts: { title: string; body: string }[];
  stack: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "conduit",
    index: "01",
    name: "Conduit",
    tagline: "Drop-in, OpenAI-compatible LLM gateway. 80% cheaper, 99% faster on cache hits.",
    role: "Design & build (solo)",
    year: "2026",
    category: "Infrastructure",
    accent: "#e4572e",
    summary: "One gateway in front of five providers. 80% cheaper on a 2,000-request load test.",
    problem:
      "Call LLMs directly and you overpay, wear every provider outage, and get no shared view of spend or latency. Conduit sits behind one base URL and fixes all three.",
    hardParts: [
      {
        title: "80% cheaper, 99% faster",
        body: "Complexity-based routing sends each prompt to the cheapest capable model, and a Redis semantic cache replays repeats in-process at $0. On a 2,000-request load test: 80% lower cost across 5 providers and 77 ms P95 on hits, versus 9.1 s cold, with no client change beyond the base URL.",
      },
      {
        title: "Zero caller-visible downtime",
        body: "Token-bucket rate limits, per-team budget caps, backoff, circuit breakers, and cross-provider failover keep an upstream outage off the caller entirely.",
      },
      {
        title: "Guardrails that run before spend",
        body: "Deterministic checks (prompt-injection, secrets, PII, payload size) run as a guard right after auth, before any model call, so a bad request is rejected for free. PII is redacted in the forwarded prompt and the answer before either is cached.",
      },
      {
        title: "A full control plane",
        body: "Prometheus and Grafana on cost, cache, and latency, plus a Next.js admin console for teams, budgets, live requests, and managed API keys. An MCP server drives the same /admin API in natural language from Claude or Cursor.",
      },
    ],
    stack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Prometheus", "Grafana", "Next.js", "MCP", "Docker", "CI/CD"],
    links: [{ label: "GitHub", href: "https://github.com/Manasd007/conduit" }],
  },
  {
    slug: "legally-ai",
    index: "02",
    name: "Legally AI",
    tagline: "Precedent-grounded legal assistant for Indian law. Every citation verified.",
    role: "Design & build (solo)",
    year: "2026",
    category: "Applied AI",
    accent: "#c9a227",
    shot: "/shots/legally-ai.png",
    award: { amount: "₹12,00,000", label: "Seed funding", from: "E-Cell" },
    summary: "Legal search grounded in real Supreme Court judgments. Won ₹12,00,000+ in seed funding.",
    problem:
      "Legal AI's core failure is invented case law. Legally AI grounds every answer in retrieved judgments and drops whatever it can't verify.",
    hardParts: [
      {
        title: "Search that can't invent case law",
        body: "A multi-stage RAG pipeline (query reformulation → vector search → citation verification) over 88,988 passages from 1,991 Supreme Court judgments. Unverifiable citations are stripped.",
      },
      {
        title: "Sub-second voice paralegal",
        body: "Real-time Hindi, English, and Hinglish voice: WebRTC and Deepgram STT → Groq Llama 3.3 70B → TTS at under 800 ms P50, with interruptible turns and cited summaries.",
      },
      {
        title: "A reasoning layer",
        body: "Precedent retrieval, InLegalBERT classification, and grounded inference return confidence scores backed by source-linked evidence.",
      },
      {
        title: "Reads any legal document",
        body: "PDF, DOCX, and OCR ingestion for clause extraction, document chat, and statute identification.",
      },
    ],
    stack: ["Next.js", "FastAPI", "TypeScript", "FAISS", "InLegalBERT", "Groq Llama 3.3", "Deepgram", "Docker"],
    links: [
      { label: "Live", href: "https://thelegally-ai.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Manasd007/legallyai" },
    ],
  },
  {
    slug: "finsight-copilot",
    index: "03",
    name: "FinSight",
    tagline: "Financial-analysis copilot. RAG over SEC 10-K / 10-Q filings.",
    role: "Full-stack build",
    year: "2025",
    category: "AI Full-Stack",
    accent: "#3a7d44",
    shot: "/shots/finsight.png",
    summary: "A copilot that answers from SEC filings, every claim traceable to the source.",
    problem:
      "Financial research means digging dense 10-K and 10-Q filings for one number. FinSight keeps every answer tied to the document it came from.",
    hardParts: [
      {
        title: "RAG grounded in filings",
        body: "Retrieval over 10-K and 10-Q filings keeps every answer tied to the document it came from, with no free-floating claims.",
      },
      {
        title: "A real retrieval stack",
        body: "FAISS over Sentence-Transformers (all-MiniLM-L6-v2) embeddings, with a Cross-Encoder reranker (qnli-distilroberta-base) sharpening context before generation.",
      },
      {
        title: "Model-flexible, cleanly split",
        body: "Local LLaMA-2-7B with a Gemini 1.5 Flash fallback. FastAPI and LangChain backend, React, TypeScript, and Vite frontend.",
      },
      {
        title: "Traceable, and comparable",
        body: "Every claim links back to the exact passage it came from, and the pipeline runs side-by-side comparisons across companies from the same filings.",
      },
    ],
    stack: ["FastAPI", "LangChain", "FAISS", "React", "TypeScript", "Vite", "Sentence-Transformers", "LLaMA-2 / Gemini"],
    links: [
      { label: "Live", href: "https://finsight-ai-dev.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Manasd007/Finsight" },
    ],
  },
  {
    slug: "waypoint",
    index: "04",
    name: "Waypoint",
    tagline: "AI travel-planning platform. Prompt to itinerary, shipped end-to-end.",
    role: "Full-stack build",
    year: "2025",
    category: "Product / SaaS",
    accent: "#1b4965",
    shot: "/shots/waypoint.png",
    summary: "Turns a prompt into a full itinerary, with planning, payments, and maps in one place.",
    problem:
      "Trip planning is scattered across a dozen tabs. Waypoint pulls generation, collaboration, payments, and maps into one product.",
    hardParts: [
      {
        title: "Prompt to full itinerary",
        body: "A vibe and a set of dates in; a day-by-day plan out: activities, food, and attractions, with collaboration, expense tracking, and mapped routes around it.",
      },
      {
        title: "Plans that don't invent places",
        body: "OpenAI returns schema-locked JSON over three batched passes, under strict accuracy rules: only real, verifiable places and true coordinates, with no fabricated names, hours, or prices.",
      },
      {
        title: "An integrated product",
        body: "Clerk auth, Razorpay payments on a credit system, Resend email sharing, and Google Maps and Places, all wired into one flow.",
      },
      {
        title: "Modern full-stack",
        body: "Next.js 15 with Tailwind and shadcn, Convex for the realtime backend, and OpenAI (gpt-4o-mini) generating the plans.",
      },
    ],
    stack: ["Next.js 15", "TypeScript", "Convex", "OpenAI", "Clerk", "Razorpay", "Google Maps", "Resend"],
    links: [
      { label: "Live", href: "https://waypointai.vercel.app/" },
      { label: "GitHub", href: "https://github.com/Manasd007/Waypoint-ai" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
