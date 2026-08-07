import type { CSSProperties } from "react";

/** Minimal filled crown, jeweled tips. Inherits color via currentColor. */
export function Crown({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
      style={style}
    >
      <path d="M3 19 L2 8 L7 11.5 L12 5 L17 11.5 L22 8 L21 19 Z" />
      <circle cx="2" cy="8" r="1.1" />
      <circle cx="12" cy="4.6" r="1.2" />
      <circle cx="22" cy="8" r="1.1" />
    </svg>
  );
}
