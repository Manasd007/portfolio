"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { Crown } from "@/components/Crown";
import { readableOn } from "@/lib/readable";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const TICKER = [
  "RAG",
  "LLM GATEWAY",
  "SEMANTIC CACHE",
  "VECTOR SEARCH",
  "80% CHEAPER",
  "FASTAPI",
  "NEXT.JS",
  "CITATION-VERIFIED",
  "CROSS-PROVIDER FAILOVER",
  "INLEGALBERT",
  "77MS P95",
  "GROQ LLAMA 3.3",
  "CONVEX",
  "PROMETHEUS",
  "SHIPPED",
];

export function SelectedWork() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (skewRef.current) {
        const setSkew = gsap.quickTo(skewRef.current, "skewX", {
          duration: 0.4,
          ease: "power3",
        });
        let idle: ReturnType<typeof setTimeout>;
        ScrollTrigger.create({
          trigger: document.body,
          start: 0,
          end: "max",
          onUpdate: (self) => {
            setSkew(clamp(self.getVelocity() / -260, -8, 8));
            clearTimeout(idle);
            idle = setTimeout(() => setSkew(0), 120);
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="relative border-y-2 border-[color:var(--fg)] bg-[color:var(--bg)]"
    >
      <div className="shell flex flex-wrap items-end justify-between gap-x-8 gap-y-8 py-10 md:py-14">
        <div>
          <SectionLabel index="02" className="mb-4">Selected Work</SectionLabel>
          <h2
            ref={headingRef}
            className="font-display uppercase leading-[0.8] tracking-[-0.03em] text-[clamp(3rem,13vw,11rem)]"
          >
            The
            <br />
            Work
          </h2>
        </div>
        <div className="mono-label space-y-1 md:text-right">
          <span className="block text-[color:var(--fg)]">[ 04 Builds ]</span>
          <span className="block">Infra / Applied AI</span>
          <span className="block">Full-Stack / SaaS</span>
          <span className="block">2025 → 2026</span>
        </div>
      </div>

      <div className="group flex select-none overflow-hidden border-y-2 border-[color:var(--fg)] bg-[color:var(--accent)] text-[color:var(--ink)]">
        <div ref={skewRef} className="marquee-skew flex">
          <div className="marquee-track py-2.5" aria-hidden>
            {[...TICKER, ...TICKER].map((t, i) => (
              <span
                key={i}
                className="mx-5 font-display text-[0.95rem] uppercase tracking-[0.08em]"
              >
                {t}
                <span className="mx-5 opacity-50">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <ul>
        {projects.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </ul>
    </section>
  );
}

function ProjectRow({ project: p }: { project: (typeof projects)[number] }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = indexRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 18 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const enter = () => {
    if (fillRef.current) fillRef.current.style.transform = "translateY(0)";
  };
  const leave = () => {
    if (fillRef.current) fillRef.current.style.transform = "translateY(101%)";
  };

  return (
    <li
      className="group relative overflow-hidden border-b-2 border-[color:var(--fg)] last:border-b-0"
      style={{ "--slam-fg": readableOn(p.accent) } as CSSProperties}
    >
      <div
        ref={fillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          transform: "translateY(101%)",
          transition: "transform 0.4s var(--ease-in-out-quart)",
          background: p.accent,
        }}
      />
      <Link
        href={`/work/${p.slug}`}
        data-cursor="Open"
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="relative z-10 block transition-colors duration-300 group-hover:text-[var(--slam-fg)]"
      >
        <div className="shell grid grid-cols-12 items-start gap-x-6 gap-y-6 py-8 md:py-10">
          <div className="col-span-3 sm:col-span-2 overflow-hidden">
            <span
              ref={indexRef}
              className="inline-block font-display leading-[0.8] text-[clamp(3rem,10vw,8rem)]"
            >
              {p.index}
            </span>
          </div>

          <div className="col-span-9 sm:col-span-6">
            <span className="inline-block border-2 border-[color:var(--fg)] px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-300 group-hover:border-[var(--slam-fg)]">
              {p.category}
            </span>
            <Reveal
              as="h3"
              className="mt-4 font-display uppercase leading-[0.85] tracking-[-0.02em] text-[clamp(2rem,6.5vw,4.75rem)]"
            >
              {p.name}
            </Reveal>
            <p className="mt-4 max-w-[46ch] text-[color:var(--muted)] transition-colors duration-300 group-hover:text-[var(--slam-fg)]">
              {p.tagline}
            </p>
            {p.award && (
              <span
                className="mt-5 inline-flex items-center gap-2 self-start border px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-[color:var(--award)] transition-colors duration-300 group-hover:text-[var(--slam-fg)]"
                style={{ "--award": p.accent, borderColor: "currentColor" } as CSSProperties}
              >
                <Crown className="h-3.5 w-3.5" />
                {p.award.amount} {p.award.label} · {p.award.from}
              </span>
            )}
          </div>

          <div className="col-span-12 flex flex-col gap-5 sm:col-span-4 sm:items-end">
            <ul className="flex flex-wrap gap-2 sm:justify-end">
              {p.stack.slice(0, 6).map((s) => (
                <li
                  key={s}
                  className="border border-[color:var(--fg)] px-2 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300 group-hover:border-[var(--slam-fg)]"
                >
                  {s}
                </li>
              ))}
            </ul>
            <span className="mono-label inline-flex items-center gap-3 transition-colors duration-300 group-hover:text-[var(--slam-fg)]">
              Open case study
              <span className="font-display text-3xl leading-none">→</span>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
