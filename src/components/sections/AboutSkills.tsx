"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function AboutSkills() {
  const listRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = listRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-cap]"), {
        opacity: 0,
        y: 22,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="shell py-[14vh]" aria-label="About and skills">
      <div className="grid grid-cols-12 gap-y-12 md:gap-x-8">
        <div className="col-span-12 md:col-span-5">
          <SectionLabel index="04" className="mb-8">About</SectionLabel>
          <div className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            <Reveal as="p">Happiest in the hard,</Reveal>
            <Reveal as="p" delay={80}>
              unglamorous parts of a system.
            </Reveal>
          </div>
          <p className="mt-8 max-w-[48ch] text-[color:var(--muted)]">
            I&rsquo;m in my final year of CS (AI &amp; ML) at Manipal University
            Jaipur and interning as a full-stack + AI engineer at NeoFab.AI. On my
            own time I&rsquo;ve built a model gateway that fronts five providers, a
            citation-verified legal assistant that won ₹12,00,000+ in seed funding, a
            RAG copilot for SEC filings, and a travel-planning app that actually
            shipped. Given two designs, I&rsquo;ll usually take the one that&rsquo;s
            easier to prove right.
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <SectionLabel className="mb-8">Capabilities</SectionLabel>
          <dl ref={listRef} className="divide-y divide-[color:var(--line)]">
            {skills.map((s) => (
              <div key={s.group} data-cap className="grid grid-cols-3 gap-4 py-5">
                <dt className="mono-label col-span-1 pt-1">{s.group}</dt>
                <dd className="col-span-2 flex flex-wrap gap-x-3 gap-y-1.5">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="text-[0.95rem] text-[color:var(--fg)]"
                    >
                      {it}
                      <span className="text-[color:var(--muted)]"> /</span>
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
