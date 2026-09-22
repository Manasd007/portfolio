import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Space_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Grain } from "@/components/Grain";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Analytics } from "@vercel/analytics/next";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const SITE = "https://manasdubey.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Manas Dubey · SDE & AI Engineer",
  description:
    "SDE & AI Engineer. Selected work: Conduit (LLM gateway), Legally AI, FinSight, Waypoint.",
  openGraph: {
    title: "Manas Dubey · SDE & AI Engineer",
    description: "SDE & AI Engineer.",
    url: SITE,
    siteName: "Manas Dubey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manas Dubey · SDE & AI Engineer",
    description: "SDE & AI Engineer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${script.variable} h-full`}
    >
      <body className="min-h-full">
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
        <Grain />
        <Cursor />
        <Analytics />
      </body>
    </html>
  );
}
