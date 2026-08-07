"use client";

import { createElement, useRef, type ElementType, type ReactNode } from "react";

/**
 * Magnetic: nudges its child toward the pointer on hover, easing back on leave.
 * Pure inline-transform (no re-render), disabled on coarse pointers / reduced
 * motion. Wrap a CTA or link so it "reaches" for the cursor.
 */
export function Magnetic({
  children,
  as: Tag = "span",
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return createElement(
    Tag,
    {
      ref,
      onPointerMove: move,
      onPointerLeave: reset,
      className: `magnetic ${className}`.trim(),
    },
    children
  );
}
