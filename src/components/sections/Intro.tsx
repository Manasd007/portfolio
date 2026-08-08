"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProfileCard } from "@/components/ProfileCard";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/data/site";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const TEXT =
  "I work across the whole stack: the model, the services around it, and the interface on top. I build all of it to stay honest. My legal assistant won't cite a case it can't find; my gateway checks its cheap answers against a stronger model before trusting them. The real work is making a system fail safe, then fast.";

/** Word-by-word scrubbed brightening as the reader scrolls through. */
export function Intro() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLElement>("[data-w]");

    if (reduce) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.set(words, { opacity: 0.16 });
    const tween = gsap.to(words, {
      opacity: 1,
      stagger: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        end: "bottom 55%",
        scrub: 0.4,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="shell py-[18vh]" aria-label="About the work">
      <SectionLabel index="01" className="mb-10">Approach</SectionLabel>
      <div className="grid grid-cols-12 items-center gap-y-14 md:gap-x-10">
      <p
        ref={ref}
        className="col-span-12 max-w-[22ch] font-display text-[clamp(1.6rem,4.2vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.02em] md:col-span-7"
      >
        {TEXT.split(" ").map((w, i) => (
          <span key={i} data-w className="inline-block">
            {w}
            {" "}
          </span>
        ))}
      </p>
        <div className="col-span-12 flex justify-center md:col-span-5 md:justify-end">
          <ProfileCard
            name="Manas Dubey"
            title="SDE / AI Engineer"
            handle="@Manasd007"
            status="Open to work"
            contactText="Email"
            onContactClick={() => {
              window.location.href = `mailto:${site.email}`;
            }}
          />
        </div>
      </div>
    </section>
  );
}
