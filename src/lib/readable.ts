/**
 * Pick ink or paper text for maximum contrast on a solid accent fill.
 * Uses WCAG relative luminance; crossover (~0.17) sits between our
 * --ink (#12100e) and --paper (#ece9e2) tokens.
 */
export function readableOn(hex: string): string {
  const c = hex.replace("#", "");
  const toLin = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const r = toLin(parseInt(c.slice(0, 2), 16) / 255);
  const g = toLin(parseInt(c.slice(2, 4), 16) / 255);
  const b = toLin(parseInt(c.slice(4, 6), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.17 ? "#12100e" : "#ece9e2";
}
