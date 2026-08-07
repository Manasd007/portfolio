"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Crown } from "@/components/Crown";
import { readableOn } from "@/lib/readable";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CaseStudy({ project: p }: { project: Project }) {
  const next = projects[(projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length];
  const heroInk = readableOn(p.accent);
  const hardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = hardRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("article"), {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, [p.slug]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{ "--accent": p.accent } as CSSProperties}
    >
      <div className="shell flex items-center justify-between border-b-2 border-[color:var(--fg)] py-5">
        <Link href="/#work" data-cursor="Back" className="mono-label hover:text-[color:var(--fg)]">
          ← Index
        </Link>
        <span className="mono-label">{p.index} / 04</span>
      </div>

      <header
        className="border-b-2 border-[color:var(--fg)]"
        style={{ background: p.accent, color: heroInk }}
      >
        <div className="shell grid grid-cols-12 items-center gap-x-10 gap-y-12 py-[9vh]">
          <div className={p.shot ? "col-span-12 lg:col-span-6" : "col-span-12"}>
            <span
              className="inline-block border-2 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em]"
              style={{ borderColor: heroInk }}
            >
              {p.category}
            </span>
            <h1
              className={`mt-6 font-display uppercase leading-[0.8] tracking-[-0.03em] ${
                p.shot
                  ? "text-[clamp(2.75rem,7vw,6.5rem)]"
                  : "text-[clamp(3rem,13vw,10.5rem)]"
              }`}
            >
              <Reveal as="span" immediate>
                {p.name}
              </Reveal>
            </h1>
            <p className="mt-6 max-w-[46ch] text-[clamp(1.1rem,1.8vw,1.5rem)] font-medium leading-snug">
              {p.tagline}
            </p>
          </div>
          {p.shot && (
            <div className="col-span-12 lg:col-span-6">
              <ProjectShot project={p} ink={heroInk} />
            </div>
          )}
        </div>
      </header>

      <div className="shell grid grid-cols-2 gap-x-6 gap-y-6 border-b-2 border-[color:var(--fg)] py-6 sm:grid-cols-3">
        <Meta k="Role" v={p.role} />
        <Meta k="Year" v={p.year} />
        <Meta k="Links" hrefs={p.links} />
      </div>

      {p.award && (
        <section
          aria-label={`${p.award.label}: ${p.award.amount} from ${p.award.from}`}
          className="border-b-2 border-[color:var(--fg)]"
          style={{ background: `color-mix(in srgb, ${p.accent} 9%, transparent)` }}
        >
          <div className="shell flex flex-col items-start gap-6 py-[7vh] sm:flex-row sm:items-center sm:gap-10">
            <Crown
              className="h-14 w-14 shrink-0 sm:h-20 sm:w-20"
              style={{ color: p.accent }}
            />
            <div>
              <p className="mono-label" style={{ color: p.accent }}>
                {p.award.label}
              </p>
              <p
                className="mt-2 font-display leading-[0.9] tracking-[-0.03em] text-[clamp(2.75rem,8vw,5.5rem)]"
                style={{ color: p.accent }}
              >
                {p.award.amount}
              </p>
              <p className="mt-3 max-w-[42ch] text-[color:var(--muted)]">
                Awarded by {p.award.from} as seed funding for {p.name}.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="shell grid grid-cols-12 gap-x-8 gap-y-8 py-[9vh]">
        <p className="mono-label col-span-12 md:col-span-3">Overview</p>
        <div className="col-span-12 md:col-span-9">
          <p className="max-w-[40ch] font-display text-[clamp(1.6rem,4vw,3rem)] uppercase leading-[1.02] tracking-[-0.02em]">
            {p.summary}
          </p>
          <p className="mt-8 max-w-[60ch] text-[color:var(--muted)]">{p.problem}</p>
        </div>
      </section>

      <section className="border-t-2 border-[color:var(--fg)]">
        <div className="shell flex items-baseline justify-between py-6">
          <h2 className="mono-label">The Hard Parts</h2>
          <span className="mono-label">[ {String(p.hardParts.length).padStart(2, "0")} ]</span>
        </div>
        <div
          ref={hardRef}
          className="grid grid-cols-1 border-t-2 border-[color:var(--fg)] md:grid-cols-2"
        >
          {p.hardParts.map((h, i) => (
            <article
              key={i}
              className="border-b-2 border-[color:var(--fg)] md:[&:nth-child(odd)]:border-r-2"
            >
              <div className="px-[var(--gutter)] py-8 md:py-10">
                <span
                  className="font-display leading-none text-[clamp(2.25rem,5vw,4rem)]"
                  style={{ color: p.accent }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 max-w-[22ch] font-display uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(1.4rem,2.8vw,2.1rem)]">
                  {h.title}
                </h3>
                <p className="mt-4 max-w-[48ch] text-[color:var(--muted)]">{h.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-[8vh]">
        <p className="mono-label mb-6">Stack</p>
        <ul className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li
              key={s}
              className="cursor-default border-2 border-[color:var(--fg)] px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.14em] transition-[color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:shadow-[0_0_20px_-3px_var(--accent)]"
            >
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-8">
          {p.links.map((l) => (
            <Magnetic key={l.href} strength={0.3}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="inline-block font-display text-[clamp(1rem,2vw,1.3rem)] font-semibold uppercase tracking-[-0.01em] underline decoration-[color:var(--fg)] decoration-2 underline-offset-8 transition-colors hover:decoration-[color:var(--accent)]"
              >
                {l.label} ↗
              </a>
            </Magnetic>
          ))}
        </div>
      </section>

      <NextLink next={next} />
    </motion.main>
  );
}

function ProjectShot({ project: p, ink }: { project: Project; ink: string }) {
  // Render the placeholder until the screenshot is confirmed to load. Preloading
  // client-side avoids a broken-image flash when the file isn't added yet.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!p.shot) return;
    const probe = new Image();
    probe.onload = () => setLoaded(probe.naturalWidth > 0);
    probe.src = p.shot;
  }, [p.shot]);

  const primary = p.links.find((l) => l.label === "Live") ?? p.links[0];
  let host = "";
  try {
    host = new URL(primary.href).hostname.replace(/^www\./, "");
  } catch {
    host = primary?.label ?? "";
  }

  return (
    <figure className="w-full overflow-hidden border-2" style={{ borderColor: ink }}>
      <div
        className="flex items-center gap-2 border-b-2 px-3 py-2"
        style={{ borderColor: ink }}
      >
        <span className="h-2.5 w-2.5 border" style={{ borderColor: ink }} />
        <span className="h-2.5 w-2.5 border" style={{ borderColor: ink }} />
        <span className="h-2.5 w-2.5 border" style={{ borderColor: ink }} />
        <span className="ml-3 truncate font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-70">
          {host}
        </span>
      </div>

      {p.shot && loaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.shot}
          alt={`${p.name} screenshot`}
          className="block h-auto w-full align-top"
        />
      ) : (
        <div
          className="relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-3"
          style={{ background: "rgba(0,0,0,0.1)" }}
        >
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] opacity-70">
            Screenshot
          </span>
          <span className="font-display uppercase leading-none text-[clamp(1.5rem,3vw,2.75rem)] opacity-25">
            {p.name}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-50">
            1600 × 1000
          </span>
        </div>
      )}
    </figure>
  );
}

function NextLink({ next }: { next: Project }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const enter = () => {
    if (fillRef.current) fillRef.current.style.transform = "translateY(0)";
  };
  const leave = () => {
    if (fillRef.current) fillRef.current.style.transform = "translateY(101%)";
  };

  return (
    <Link
      href={`/work/${next.slug}`}
      data-cursor="Next"
      onMouseEnter={enter}
      onMouseLeave={leave}
      className="group relative block overflow-hidden border-t-2 border-[color:var(--fg)]"
      style={{ "--slam-fg": readableOn(next.accent) } as CSSProperties}
    >
      <div
        ref={fillRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          transform: "translateY(101%)",
          transition: "transform 0.4s var(--ease-in-out-quart)",
          background: next.accent,
        }}
      />
      <div className="shell relative z-10 flex items-center justify-between py-[8vh] transition-colors duration-300 group-hover:text-[var(--slam-fg)]">
        <div>
          <p className="mono-label mb-3">Next Project</p>
          <span className="font-display uppercase leading-[0.85] tracking-[-0.02em] text-[clamp(2rem,7vw,5rem)]">
            {next.name}
          </span>
        </div>
        <span className="font-display text-[clamp(2rem,6vw,4rem)] leading-none transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </div>
    </Link>
  );
}

function Meta({
  k,
  v,
  hrefs,
}: {
  k: string;
  v?: string;
  hrefs?: { label: string; href: string }[];
}) {
  return (
    <div>
      <dt className="mono-label mb-2">{k}</dt>
      <dd className="font-mono text-[0.85rem] uppercase tracking-[0.06em]">
        {hrefs
          ? hrefs.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="underline decoration-[color:var(--line)] underline-offset-4 hover:decoration-[color:var(--accent)]"
              >
                {l.label}
                {i < hrefs.length - 1 ? " · " : ""}
              </a>
            ))
          : v}
      </dd>
    </div>
  );
}
