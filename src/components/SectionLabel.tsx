import type { CSSProperties, ReactNode } from "react";

/**
 * Section eyebrow: a big outlined "ghost" index numeral beside a quiet label.
 * Replaces the old mono "0X / Name" kicker. The numeral is purely decorative
 * (aria-hidden); the label carries the readable text. Omit index for a plain
 * quiet label with no numeral.
 */
export function SectionLabel({
  index,
  children,
  className = "",
  style,
}: {
  index?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`section-label ${className}`.trim()} style={style}>
      {index && (
        <span className="section-label__num" aria-hidden>
          {index}
        </span>
      )}
      <span className="section-label__text">{children}</span>
    </div>
  );
}
