"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Reveal: clips children and slides them up when they enter the viewport
 * (or immediately, if `immediate`). Falls back to a plain render under
 * prefers-reduced-motion. Each direct line should be passed as a child span.
 */
export function Reveal({
  children,
  as: Tag = "span",
  delay = 0,
  immediate = false,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  immediate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || immediate) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return createElement(
    Tag,
    {
      ref,
      className: `reveal-line ${inView ? "is-in" : ""} ${className}`.trim(),
    },
    <span style={{ transitionDelay: `${delay}ms` }}>{children}</span>
  );
}
