"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { SectionLabel } from "@/components/SectionLabel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-exp]").forEach((block) => {
        const stats = block.querySelector<HTMLElement>("[data-stats]");
        if (stats) {
          gsap.from(stats.querySelectorAll<HTMLElement>("[data-stat]"), {
            opacity: 0,
            y: 26,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: { trigger: stats, start: "top 85%" },
          });
        }
        const points = block.querySelector<HTMLElement>("[data-points]");
        if (points) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: points, start: "top 82%" },
          });
          tl.from(points.querySelectorAll<HTMLElement>("[data-dash]"), {
            scaleX: 0,
            transformOrigin: "0 50%",
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.1,
          }).from(
            points.querySelectorAll<HTMLElement>("[data-point] > div"),
            {
              opacity: 0,
              y: 14,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.1,
            },
            "<0.05"
          );
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="experience"
      className="relative py-[10vh]"
      aria-label="Experience"
    >
      <div className="shell flex items-end border-b border-[color:var(--line)] pb-6">
        <SectionLabel index="03">Experience</SectionLabel>
      </div>

      {experience.map((e) => (
        <article
          key={e.company}
          data-exp
          className="border-b border-[color:var(--line)] last:border-b-0"
        >
          <div className="shell py-12 md:py-16">
            <div className="grid grid-cols-12 items-end gap-y-6">
              <div className="col-span-12 md:col-span-8">
                <span className="mono-label mb-4 block">
                  {e.period} · {e.location}
                </span>
                <Reveal as="h3" className="display-lg">
                  {e.company}
                </Reveal>
                <p className="mt-4 text-[color:var(--muted)]">
                  {e.role}
                  <span className="text-[color:var(--muted)]"> · {e.focus}</span>
                </p>
              </div>
              {e.current && (
                <div className="col-span-12 md:col-span-4 md:text-right">
                  <span className="mono-label inline-flex items-center gap-2 border border-[color:var(--line)] px-3 py-1.5">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]"
                    />
                    Current role
                  </span>
                </div>
              )}
            </div>

            <div
              data-stats
              className="mt-12 grid grid-cols-2 gap-px border border-[color:var(--line)] bg-[color:var(--line)] md:grid-cols-4"
            >
              {e.metrics.map((m, i) => (
                <div
                  key={i}
                  data-stat
                  className="group bg-[color:var(--bg)] px-5 py-7 transition-colors duration-300 hover:bg-[color:var(--ink-800)] md:px-6 md:py-9"
                >
                  <div
                    className="font-display leading-[0.9] tracking-[-0.02em] text-[clamp(2.75rem,5.5vw,4.5rem)]"
                    style={m.accent ? { color: "var(--accent)" } : undefined}
                  >
                    {m.prefix}
                    <CountUp to={m.value} from={m.from ?? 0} />
                    {m.suffix && (
                      <span style={{ color: "var(--accent)" }}>{m.suffix}</span>
                    )}
                  </div>
                  <div className="mono-label mt-4 text-[color:var(--fg)]">
                    {m.label}
                  </div>
                  {m.sub && (
                    <div className="mt-1.5 font-mono text-[0.72rem] tracking-[0.04em] text-[color:var(--muted)]">
                      {m.sub}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <ul
              data-points
              className="mt-12 grid gap-x-12 gap-y-6 md:grid-cols-2"
            >
              {e.points.map((pt, i) => (
                <li key={i} data-point className="flex gap-4 text-[color:var(--fg)]">
                  <span
                    aria-hidden
                    data-dash
                    className="mt-[0.8em] h-px w-6 shrink-0 bg-[color:var(--accent)]"
                  />
                  <div className="max-w-[54ch]">
                    <h4 className="font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.01em]">
                      {pt.lead}
                    </h4>
                    <p className="mt-2 text-[0.95rem] text-[color:var(--muted)]">
                      {pt.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
