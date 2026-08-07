"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { SectionLabel } from "@/components/SectionLabel";

const HeroCanvas = dynamic(() => import("@/components/webgl/HeroCanvas"), {
  ssr: false,
});

/** Static CSS poster used on coarse pointers / reduced motion / before WebGL mounts. */
function Poster() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(120% 90% at 30% 15%, rgba(228,87,46,0.22), transparent 55%)," +
          "radial-gradient(90% 80% at 80% 60%, rgba(27,73,101,0.35), transparent 60%)," +
          "var(--ink)",
      }}
    />
  );
}

export function Hero() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    // Run the WebGL hero on any fine-pointer device (desktop at any window
    // width) and fall back to the static poster only for touch devices or
    // reduced-motion. Re-evaluate live so resizing or plugging in a mouse
    // flips it without a reload. Shrinking the window no longer kills it.
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setWebgl(!coarse.matches && !reduce.matches);
    evaluate();
    coarse.addEventListener("change", evaluate);
    reduce.addEventListener("change", evaluate);
    return () => {
      coarse.removeEventListener("change", evaluate);
      reduce.removeEventListener("change", evaluate);
    };
  }, []);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0">
        <Poster />
        {webgl && <HeroCanvas />}
      </div>

      <header className="shell relative z-10 flex items-center justify-between pt-7">
        <span
          className="mono-label fade-up"
          style={{ color: "var(--fg)", animationDelay: "0.1s" }}
        >
          Manas Dubey
        </span>
        <span
          className="mono-label fade-up hidden sm:block"
          style={{ animationDelay: "0.2s" }}
        >
          SDE / AI Engineer
        </span>
        <span className="mono-label fade-up" style={{ animationDelay: "0.3s" }}>
          © 2026
        </span>
      </header>

      <div className="shell relative z-10 pb-[8vh]">
        <SectionLabel
          className="mb-6 fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          Selected work · 2025 / 2026
        </SectionLabel>
        <h1 className="display-xl max-w-[16ch]">
          <Reveal as="span" immediate delay={80}>
            I build AI systems
          </Reveal>{" "}
          <Reveal as="span" immediate delay={220}>
            that <span style={{ color: "var(--accent)" }}>ship.</span>
          </Reveal>
        </h1>
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <p
            className="max-w-[42ch] text-[color:var(--muted)] fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            I&rsquo;m a software engineer working across LLM infrastructure,
            retrieval, and full-stack products. Four things I&rsquo;ve built are
            below, from a gateway that fronts five model providers to a legal
            assistant that won&rsquo;t cite a case it can&rsquo;t find.
          </p>
          <div className="fade-up shrink-0 self-start" style={{ animationDelay: "0.6s" }}>
            <Magnetic strength={0.4}>
              <a
                href="#work"
                data-cursor="Scroll"
                aria-label="View the work"
                className="inline-flex h-11 w-11 items-center justify-center"
                style={{ color: "var(--fg)" }}
              >
                <span className="cue-arrow font-display text-4xl leading-none">↓</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
