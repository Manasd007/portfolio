"use client";

import { site } from "@/data/site";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { SectionLabel } from "@/components/SectionLabel";

export function Contact() {
  return (
    <section
      id="contact"
      className="shell relative flex min-h-[80svh] flex-col justify-between py-[10vh]"
      aria-label="Contact"
    >
      <SectionLabel index="05">Contact</SectionLabel>

      <div className="py-[8vh]">
        <h2 className="display-xl">
          <Reveal as="span">Got an idea</Reveal>
          <Reveal as="span" delay={120}>
            worth <span style={{ color: "var(--accent)" }}>shipping?</span>
          </Reveal>
        </h2>
        <div className="mt-10">
          <Magnetic strength={0.3}>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Email"
              className="inline-block font-display text-[clamp(1.1rem,2.4vw,1.8rem)] font-semibold tracking-[-0.02em] underline decoration-[color:var(--line)] decoration-1 underline-offset-8 transition-colors hover:decoration-[color:var(--accent)]"
            >
              {site.email}
            </a>
          </Magnetic>
        </div>
      </div>

      <footer className="flex flex-col gap-6 border-t border-[color:var(--line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {[
            { label: "GitHub", href: site.github },
            { label: "LinkedIn", href: site.linkedin },
            { label: "Résumé", href: site.resume },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="mono-label link-wipe transition-colors hover:text-[color:var(--fg)]"
            >
              {l.label} ↗
            </a>
          ))}
        </nav>
        <p className="mono-label">© 2026 {site.name} · Designed &amp; built by me.</p>
      </footer>
    </section>
  );
}
