"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a lerped ring that grows and shows a label over elements
 * carrying `data-cursor="LABEL"`. Disabled on coarse pointers / reduced motion,
 * where the native cursor is restored via CSS.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor], a, button");
      if (el) {
        setActive(true);
        setLabel(el.getAttribute("data-cursor") ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: active ? (label ? "auto" : "56px") : "10px",
        height: active && !label ? "56px" : label ? "auto" : "10px",
        padding: label ? "0.5rem 0.9rem" : 0,
        borderRadius: "999px",
        border: `1px solid ${active ? "transparent" : "var(--paper)"}`,
        background: label || (active && !label) ? "var(--accent)" : "transparent",
        color: "var(--paper)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        mixBlendMode: active ? "normal" : "difference",
        transition:
          "width 0.35s var(--ease-out-expo), height 0.35s var(--ease-out-expo), background 0.3s, padding 0.3s",
        willChange: "transform",
      }}
    >
      {label}
    </div>
  );
}
