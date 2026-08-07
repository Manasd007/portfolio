"use client";

/**
 * Film-grain overlay. Uses an inline SVG feTurbulence as a data URI so there is
 * no network request and no raster asset to ship. Purely decorative.
 */
const NOISE = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
    <feColorMatrix type='saturate' values='0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`;

export function Grain() {
  const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(NOISE)}")`;
  return (
    <div
      className="grain"
      aria-hidden="true"
      style={{ ["--grain-img" as string]: url }}
    />
  );
}
